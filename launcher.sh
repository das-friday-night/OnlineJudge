#!/bin/bash

# prerequisite: npm, pip, nodemon, angular-cli, redis, docker

#kill any process on port 3000
fuser -k 3000/tcp
fuser -k 5000/tcp

#cycle redis service
service redis_6379 stop
service redis_6379 start

cd ./client/
ng build

cd ../server/
#run node server on background
nodemon server.js &

cd ../executor/
#run flask server on background
python executor_server.py &

echo "=================================================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop