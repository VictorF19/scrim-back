#!/bin/bash

npx sequelize-cli db:migrate
node server.js