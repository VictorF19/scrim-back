FROM node:17-alpine

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["/bin/sh", "./run.sh"]