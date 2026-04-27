#!/bin/bash

set -e

echo "Setting up project..."

mkdir -p .logs

if [ ! -f "client/.env.local" ]; then
  cat > client/.env.local <<EOF
NEXT_PUBLIC_API_URL=/api
API_BASE_URL=http://localhost:5002/api
EOF
fi

cd server
npm install
npm run generate
npm run db:push
npm run seed
nohup npm run dev > ../.logs/server.log 2>&1 &
echo $! > ../.logs/server.pid
cd ..

cd client
npm install
nohup npm run dev > ../.logs/client.log 2>&1 &
echo $! > ../.logs/client.pid
cd ..

sleep 8

echo ""
echo "Project started."
echo "Open:"
echo "http://localhost:3000"
echo ""
echo "To stop later:"
echo "kill \$(cat .logs/server.pid) \$(cat .logs/client.pid)"
