FROM node

EXPOSE 4000

WORKDIR /spyit

COPY ./package*.json ./

RUN npm install

COPY ./docker-entrypoint.sh / 

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
