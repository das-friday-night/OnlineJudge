#!/bin/bash
#kill any process on port 3000
fuser -k 3000/tcp

# TODO: checker for redis install or not

#power cycle redis service
service redis_6379 stop
service redis_6379 start

# TODO: check for npm install or not

cd ./server/
npm install
#run node server on background
nodemon server.js &

cd ../client/
npm install
ng build --watch

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
service redis_6379 stop