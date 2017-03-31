# Installation Guide 
## **Note:**
## This guide works well with a brand new ubuntu 16.04 LTS, please run each command wisely if you have some tools installed already on your machine. For other OSs, especially Windows, please reference offical website of each tool for installation.

## **Tools to be used:**
* curl 
* pip
* nodejs & npm
* angular-cli
* nodemon
* redis
* docker

## **Step:**
1. kill process which uses port 3000
```
fuser -k 3000/tcp
fuser -k 5000/tcp
```
2. update repo
```
sudo apt-get update && sudo apt-get -y upgrade
```
3. install curl
```
sudo apt-get install curl
```
4. install pip
```
sudo apt-get install python-pip -y
```
5. install npm together with nodejs
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
6. install angular-cli
```
sudo npm install -g @angular/cli
```
7. install nodemon
```
sudo npm install -g nodemon
```
8. install client component
```
cd client/
npm install
ng build
```
9. install node server component
```
cd ../server/
npm install
```
10. install redis
```
cd ..
wget http://download.redis.io/releases/redis-3.2.8.tar.gz
tar xzf redis-3.2.8.tar.gz
rm redis-3.2.8.tar.gz
cd redis-3.2.8
sudo make install
```
11. install redis service
  * follow the default setting when  `sudo ./install_server.sh`
```
cd utils
sudo ./install_server.sh  
sudo service redis_6379 start
```
12. install flask executor server component
```
cd ../../executor/
sudo pip install -r requirements.txt
```
13. install docker
```
curl -fsSL https://get.docker.com/ | sh
sudo usermod -aG docker $(whoami)
```
14. reboot computer required for `usermod` to become effective, after reboot cd into OnlineJudge/executor/
```
sudo reboot
docker build -t siyuanli/onlinejudge .
```
15. run node server
```
cd ../server/
nodemon server.js &
```

16. run flask server
```
cd ../server/
python executor_server.py & 
```

## **Stop service:**
```
fuser -k 3000/tcp
fuser -k 5000/tcp
service redis_6379 stop
```

