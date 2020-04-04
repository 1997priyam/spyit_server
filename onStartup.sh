sudo docker rm -f spyit

sudo docker run -dit --restart unless-stopped -p 4000:4000 -v /home/1997priyam/spyit_server:/spyit --name spyitcontainer spyit:latest "npm install && npm start"
