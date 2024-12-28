FROM node:20-alpine

ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

COPY package.json $APP_HOME
COPY yarn.lock $APP_HOME
RUN yarn install
COPY . $APP_HOME

RUN yarn build

CMD ["yarn", "start"]