FROM node:12.16.1-alpine

WORKDIR /app

ADD package.json .
ADD . .

RUN npm i
RUN npm run build 

CMD npm start