#!/bin/bash

# Life OS - Quick Install Script
# Run with: bash install.sh

echo "🎮 Life OS RPG Dashboard — Installation"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm detected: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed"
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Development:     npm run dev"
echo "  Production Build: npm run build"
echo "  Preview Build:    npm run preview"
echo ""
echo "📖 Documentation:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Quick Start:  cat QUICKSTART.md"
echo "  Full Docs:    cat README.md"
echo "  Delivery:     cat DELIVERY.md"
echo ""
echo "🎯 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  1. Run:   npm run dev"
echo "  2. Open:  http://localhost:5173"
echo "  3. Test:  Add meal, hit timer, check XP"
echo ""
echo "Happy questing! 🎮✨"
