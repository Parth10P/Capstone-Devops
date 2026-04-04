#!/bin/bash

echo "Setting up ShopSmart..."

# Setup Server
cd server
npm install
npx prisma migrate dev --name init
npx prisma generate
cd ..

# Setup Client
cd client
npm install
cd ..

echo "Setup complete!"
echo ""
echo "Start the app with:"
echo "  Terminal 1: cd server && npm run dev"
echo "  Terminal 2: cd client && npm run dev"
