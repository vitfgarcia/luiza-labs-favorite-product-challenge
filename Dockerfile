FROM node:12.16.1-alpine

WORKDIR /src

ADD package.json /src/

RUN set -x \
    && apk update \
    && npm i

ADD . /src

RUN npm run build \
    && npm i --production

CMD npm start