#!/bin/bash

# ===========================================================
# Collaboration Setup Script - AI Tech Recruiter
# ===========================================================
#
# This script sets up the project for collaboration
#
# Usage:
#   ./scripts/collab-setup.sh
#
# Or run individual commands
# ===========================================================

echo "🤝 Setting up AI Tech Recruiter for collaboration..."

# ============================================
# 1. Set up Git hooks
# ============================================

echo ""
echo "🔧 Setting up Git hooks..."
git config core.hooksPath .githooks

if [ $? -eq 0 ]; then
    echo "✅ Git hooks configured successfully!"
else
    echo "❌ Failed to configure Git hooks"
fi

# ============================================
# 2. Check Git configuration
# ============================================

echo ""
echo "👤 Checking Git configuration..."

# Check if user.name is set
if git config --get user.name > /dev/null 2>&1; then
    echo "✅ Git user name: $(git config --get user.name)"
else
    echo "⚠️  Git user name not set. Please configure:"
    echo "   git config --global user.name \"Your Name\""
fi

# Check if user.email is set
if git config --get user.email > /dev/null 2>&1; then
    echo "✅ Git user email: $(git config --get user.email)"
else
    echo "⚠️  Git user email not set. Please configure:"
    echo "   git config --global user.email \"your.email@example.com\""
fi

# ============================================
# 3. Check branch
# ============================================

echo ""
echo "📍 Checking current branch..."
current_branch=$(git branch --show-current)

if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
    echo "✅ On main branch: $current_branch"
else
    echo "ℹ️  On branch: $current_branch"
    echo "Consider switching to main: git checkout main"
fi

# ============================================
# 4. Check for updates
# ============================================

echo ""
echo "🔄 Checking for remote updates..."
git fetch --quiet

local_commit=$(git rev-parse HEAD)
remote_commit=$(git rev-parse @{u} 2>/dev/null)

if [ "$local_commit" != "$remote_commit" ]; then
    echo "⚠️  Your branch is behind. Consider pulling:"
    echo "   git pull"
else
    echo "✅ Repository is up to date"
fi

# ============================================
# 5. Project dependencies
# ============================================

echo ""
echo "📦 Checking project setup..."

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
else
    echo "⚠️  Node.js not found. Please install Node.js $(cat package.json | grep '"node":' | sed 's/.*"node": "\([^"]*\)".*/\1/')"
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found: $(docker --version)"
else
    echo "⚠️  Docker not found. Recommended for full setup."
fi

# ============================================
# Summary
# ============================================

echo ""
echo "🎉 Collaboration setup complete!"
echo ""
echo "📋 Next steps:"
echo "  1. Review and fill .env.example → .env (do not commit .env!)"
echo "  2. Run: npm install (if needed)"
echo "  3. Follow QUICK_START.md"
echo "  4. For questions: Check FAQ.md or email demo@example.com"
echo ""
echo "🔐 Never commit:"
echo "  - .env files"
echo "  - API keys/tokens"
echo "  - Personal credentials"
echo ""
