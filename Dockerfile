# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --save-dev

COPY . .

ARG token
ARG database_host
ARG database_username
ARG database_password

ENV TOKEN=$token
ENV DVA_DATABASE_HOST=$database_host
ENV DVA_DATABASE_USER=$database_username
ENV DVA_DATABASE_PASSWORD=$database_password

CMD [ "node", "index.js" ]