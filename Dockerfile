FROM node:15

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["/bin/bash", "./run.sh"]