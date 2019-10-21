FROM node:12.11.1-alpine as install

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install && yarn cache clean

FROM install as test

COPY tsconfig.json .babelrc prettier.config.js gulpfile.ts ./
COPY src ./src

FROM test as build

RUN yarn build

RUN yarn install --prod --ignore-scripts --force && yarn cache clean

CMD ["yarn", "start"]
