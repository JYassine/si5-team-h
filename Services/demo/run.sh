#!/bin/bash

cd ../RootingService
node ./server.js &
cd ../BookingService
node ./server.js &
cd ../PaymentService
node ./server.js &
cd ../TravelService
node ./server.js &

cd ../demo
npm test
npx kill-port 4004
npx kill-port 4003
npx kill-port 4002
npx kill-port 4001
