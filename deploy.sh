#!/bin/bash

cp .env.local .env

# bunx drizzle-kit generate
# bunx drizzle-kit migrate
bunx drizzle-kit push

uv run sinorasi-scraper/news.py
