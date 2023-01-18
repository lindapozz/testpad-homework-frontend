FROM node:16-alpine

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN yarn

CMD [ "yarn", "run" ,"dev" ]

EXPOSE 3000
