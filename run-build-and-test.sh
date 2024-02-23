#!/bin/bash

cd app
docker build -t wladimirteixeiraneto/rinha:latest .
docker compose down -v
docker compose up -d

sleep 5
cd ..
./load-test/run-test.sh