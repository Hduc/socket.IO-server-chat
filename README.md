# Socket.Chat
# Setup Deploy in server
## Step 1

>Download nodejs https://nodejs.org/en/download/current/
## Step 2

>npm install -g pm2
## Step 3
cd folder

>pm2 start server.js --name=SOCKET_IO
## Step 4 (autorun in reboot windows)
>npm install pm2-windows-startup -g

>pm2 -f save

>pm2-startup install

## stop 
>pm2 stop SOCKET_IO

## start
>pm2 start SOCKET_IO

## status all
>pm2 list
## Done
