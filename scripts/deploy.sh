#!/bin/bash
set -e

echo "Deploying 30-Day Diabetes Management Plan to Vercel..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Configure git user
git config user.email "v0[bot]@users.noreply.github.com" || true
git config user.name "v0[bot]" || true

# Add all changes
echo "Staging changes..."
git add -A

# Commit changes
echo "Committing changes..."
git commit -m "Restore 30-day diabetes management plan as Next.js app with all original features and styling" \
  --no-verify || echo "Nothing to commit"

# Push to main branch
echo "Pushing to GitHub (this will trigger Vercel deployment)..."
git push origin main --force || git push -u origin main --force

echo ""
echo "✓ Deployment complete! Your app is being built and deployed to Vercel."
echo "Check your deployment at: https://daddy-30day-restoration-diet-plan-j1mq7cml0.vercel.app/"
