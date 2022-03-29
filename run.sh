#!/bin/sh

npx sequelize-cli db:migrate
node server.js