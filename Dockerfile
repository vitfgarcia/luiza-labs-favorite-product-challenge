FROM node:12.16.1-alpine

WORKDIR /src

ADD package.json /src/
ADD . /src

RUN npm i
RUN npm run build 

CMD npm start