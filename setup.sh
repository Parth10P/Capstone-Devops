!#/bin/bash

echo "Setting up the project..."

cd server
npm i
npm start

cd ../client
npm i
npm run dev


echo "Project setup complete!"
