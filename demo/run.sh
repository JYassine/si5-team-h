#!/bin/bash

cd ../Services/RootingService
npm install
node ./server.js &
cd ../BookingService
npm install
node ./server.js &
cd ../PaymentService
npm install
node ./server.js &
cd ../TravelService
npm install
node ./server.js &

cd ../../demo
npm install
npm test
npx kill-port 4004
npx kill-port 4003
npx kill-port 4002
npx kill-port 4001
