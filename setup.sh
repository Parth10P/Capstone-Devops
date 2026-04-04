!#/bin/bash

echo "Setting up the project..."

cd server
npm i
nodemon src/index.js

cd ../client
npm i
npm run dev

