!#/bin/bash

echo "Setting up the project..."

cd server
npm i

cd ../client
npm i

cd ..
npm start


echo "Project setup complete!"
