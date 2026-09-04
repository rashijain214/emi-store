#!/usr/bin/env bash
set -e
echo "Initializing git repository and creating initial commit..."
git init
git add .
git commit -m "Initial scaffold: backend + frontend + prisma + postgres"
echo "Now create a GitHub repo and push. Example commands (replace <your-repo>):"
echo "  gh repo create <your-username>/<your-repo> --public --source=. --remote=origin --push"
echo "Or add remote and push:"
echo "  git remote add origin git@github.com:<your-username>/<your-repo>.git"
echo "  git push -u origin main"
