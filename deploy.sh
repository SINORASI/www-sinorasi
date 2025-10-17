#!/bin/bash

# Deployment script for SMKN 2 Singosari website
# This script sets up the environment, installs dependencies, and migrates the database

set -e  # Exit on any error

echo "🚀 Starting deployment of SMKN 2 Singosari website..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file with the following variables:"
    echo "DATABASE_URL=postgresql://username:password@localhost:5432/database_name"
    echo "BETTER_AUTH_SECRET=your-secret-key"
    echo "BETTER_AUTH_URL=http://localhost:3000"
    exit 1
fi

echo "✅ .env file found"

# Install dependencies
echo "📦 Installing dependencies..."
if command -v bun &> /dev/null; then
    bun install
    echo "✅ Dependencies installed with bun"
else
    npm install
    echo "✅ Dependencies installed with npm"
fi

# Generate Prisma client and push schema
echo "🗄️ Setting up database..."
npx drizzle-kit generate
npx drizzle-kit push

echo "✅ Database schema migrated"

# Build the application
echo "🔨 Building application..."
if command -v bun &> /dev/null; then
    bun run build
    echo "✅ Application built with bun"
else
    npm run build
    echo "✅ Application built with npm"
fi

# Optional: Run database migrations if you have custom migration scripts
if [ -f "migrate_news.py" ]; then
    echo "📰 Running news migration..."
    python3 migrate_news.py
    echo "✅ News migration completed"
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "To start the development server, run:"
echo "  bun run dev  # or npm run dev"
echo ""
echo "To start the production server, run:"
echo "  bun run start  # or npm run start"