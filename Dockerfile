FROM node

EXPOSE 4000

WORKDIR /spyit

COPY ./package*.json ./

RUN npm install

