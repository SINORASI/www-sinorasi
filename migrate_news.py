#!/usr/bin/env python3
"""
Migration script to transfer news data from SQLite to PostgreSQL
"""
import sqlite3
import json
import os
import shutil
import re
from datetime import datetime
from pathlib import Path

# Database connections
SQLITE_DB = 'sinorasi-scraper/news.db'
POSTGRES_URL = 'postgresql://myuser:mypassword@localhost:5432/mydb'

# Paths
SOURCE_IMAGES = 'article_images'
TARGET_IMAGES = '../public/images/news'

def create_connection():
    """Create PostgreSQL connection using psycopg2"""
    try:
        import psycopg2
    except ImportError:
        print("psycopg2 not found, trying psycopg2-binary...")
        import psycopg2 as psycopg2
    from urllib.parse import urlparse

    url = urlparse(POSTGRES_URL)
    conn = psycopg2.connect(
        host=url.hostname,
        port=url.port,
        database=url.path[1:],
        user=url.username,
        password=url.password
    )
    return conn

def migrate_news_data():
    """Migrate news data from SQLite to PostgreSQL"""
    print("Starting news data migration...")

    # Connect to SQLite
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    sqlite_conn.row_factory = sqlite3.Row
    sqlite_cursor = sqlite_conn.cursor()

    # Connect to PostgreSQL
    pg_conn = create_connection()
    pg_cursor = pg_conn.cursor()

    # Get all articles with their thumbnail images
    sqlite_cursor.execute("""
        SELECT a.*,
               (SELECT i.image_path FROM images i WHERE i.article_id = a.id AND i.is_thumbnail = 1 LIMIT 1) as thumbnail_path,
               GROUP_CONCAT(CASE WHEN i.is_thumbnail = 0 THEN i.image_path END) as content_image_paths
        FROM articles a
        LEFT JOIN images i ON a.id = i.article_id
        GROUP BY a.id
        ORDER BY a.published_date DESC
    """)

    articles = sqlite_cursor.fetchall()
    print(f"Found {len(articles)} articles to migrate")

    # Process each article
    for article in articles:
        try:
            # Generate slug
            slug = generate_slug(article['title'])

            # Parse published date
            published_at = parse_published_date(article['published_date'])

            # Process tags
            tags = parse_tags(article['tags'])

            # Process content and images
            content, thumbnail = process_content_and_images(
                article['content'],
                article['thumbnail_path'],
                article['content_image_paths'],
                article['post_id']
            )

            # Insert into PostgreSQL
            pg_cursor.execute("""
                INSERT INTO news (slug, title, subtitle, thumbnail, tags, content, published_at, author)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (slug) DO NOTHING
            """, (
                slug,
                article['title'],
                "",  # subtitle
                thumbnail,
                json.dumps(tags),
                content,
                published_at,
                "SMKN 2 Singosari"
            ))

            print(f"Migrated: {article['title'][:50]}...")

        except Exception as e:
            print(f"Error migrating article {article['post_id']}: {e}")
            continue

    # Commit changes
    pg_conn.commit()

    # Close connections
    sqlite_conn.close()
    pg_conn.close()

    print("News data migration completed!")

def generate_slug(title):
    """Generate URL slug from title"""
    slug = re.sub(r'[^\w\s-]', '', title).strip().lower()
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug

def parse_published_date(date_str):
    """Parse published date string"""
    if date_str and date_str != " ":
        try:
            # Handle YYYY-MM-DD format
            if len(date_str) == 10 and date_str.count('-') == 2:
                return datetime.strptime(date_str, '%Y-%m-%d').date().isoformat()
            # Handle YYYY-MM-DD format with invalid day - replace YYYY with 2024
            elif 'YYYY-' in date_str:
                date_str = date_str.replace('YYYY', '2024')
                return datetime.strptime(date_str, '%Y-%m-%d').date().isoformat()
        except:
            pass
    # Default to current date if parsing fails
    return datetime.now().date().isoformat()

def parse_tags(tags_str):
    """Parse tags string into list"""
    if tags_str:
        delimiters = re.compile(r'[,;|]')
        return [tag.strip() for tag in delimiters.split(tags_str) if tag.strip()]
    return []

def process_content_and_images(content, thumbnail_path, content_image_paths, post_id):
    """Process content and move/copy images"""
    thumbnail = ""
    processed_content = content or ""

    # Process thumbnail
    if thumbnail_path:
        new_thumb_path = move_image(thumbnail_path, post_id)
        if new_thumb_path:
            thumbnail = f"/images/news/{os.path.basename(new_thumb_path)}"

    # Process content images
    if content_image_paths:
        content_images = content_image_paths.split(',') if content_image_paths else []
        for img_path in content_images:
            if img_path:
                new_path = move_image(img_path, post_id)
                if new_path:
                    new_web_path = f"/images/news/{os.path.basename(new_path)}"
                    processed_content += f"\n\n![{os.path.basename(new_path)}]({new_web_path})\n"

    return processed_content, thumbnail

def move_image(image_path, post_id):
    """Move image from source to target directory"""
    if not image_path:
        return None

    # Ensure target directory exists
    os.makedirs(TARGET_IMAGES, exist_ok=True)

    # Source path
    source_path = os.path.join('sinorasi-scraper', image_path.replace('\\', '/'))

    if os.path.exists(source_path):
        # Target path
        target_path = os.path.join(TARGET_IMAGES, os.path.basename(image_path))

        try:
            # Copy file (don't remove original)
            shutil.copy2(source_path, target_path)
            return target_path
        except Exception as e:
            print(f"Error copying image {source_path}: {e}")
            return None
    else:
        print(f"Image not found at {source_path}")

    return None

if __name__ == "__main__":
    migrate_news_data()