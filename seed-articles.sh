#!/bin/bash
# Quick seed script for blog articles
# Run this from the project root: bash seed-articles.sh

echo "🚀 Seeding blog articles..."

# Send POST request to seed endpoint
curl -X POST http://localhost:3000/api/admin/seed-articles \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"force": true}' \
  -s -w "\n%{http_code}\n" | tail -1

if [ $? -eq 0 ]; then
  echo "✅ Articles seeded successfully!"
  echo "📝 Navigate to http://localhost:3000/academy to verify"
else
  echo "❌ Failed to seed articles"
  echo "Make sure the development server is running on localhost:3000"
fi
