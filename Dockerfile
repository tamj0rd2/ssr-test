FROM node:12.11.1-alpine as install

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app/

RUN yarn gulp

CMD ["./exists.sh"]
