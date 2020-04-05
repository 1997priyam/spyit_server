sudo docker rm -f spyitcontainer &> /dev/null

sudo docker run -dit --restart unless-stopped -p 4000:4000 -v /home/1997priyam/spyit_server:/spyit --name spyitcontainer spyit:latest npm start 
