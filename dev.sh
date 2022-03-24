#!/bin/sh

isPassword="0"
isPort="0"
password=""
port=""

for line in $(echo $(<.env) | tr "=" "\n")
do
    if [ $isPassword == "1" ];
    then
        password=$line
        isPassword="0"
    fi
    if [ $isPort == "1" ];
    then
        port=$line
        isPort="0"
    fi
    if [ $line == "DATABASE_PASSWORD" ];
    then
        isPassword="1"
    fi
    if [ $line == "DATABASE_PORT" ];
    then
        isPort="1"
    fi
done

docker run -d \
    --name scrim \
    -e POSTGRES_PASSWORD=$password \
    -p 5432:5432 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v scrim-postgres:/var/lib/postgresql/data \
    postgres

docker exec -it scrim psql -U postgres -c 'CREATE DATABASE scrim;'

npx sequelize-cli db:migrate

npm run start