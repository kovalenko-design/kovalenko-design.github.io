#!/usr/bin/env bash
# One-stop publish for kovalenko.info
# Usage:  ./publish.sh "commit message"
#         ./publish.sh                # uses a default message
#
# Stages everything, commits, pushes to main. GitHub Actions then builds
# and deploys to https://kovalenko.info (watch the Actions tab, ~1-2 min).

set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Update site content}"

if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to commit."
else
  git add -A
  git commit -m "$MSG"
fi

echo "Pushing to origin/main..."
git push origin main

echo
echo "Pushed. Deploy running:"
echo "  https://github.com/kovalenko-design/kovalenko-design.github.io/actions"
echo "Live in ~1-2 min at https://kovalenko.info"
