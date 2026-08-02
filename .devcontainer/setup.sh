#!/bin/bash
cd proficape
docker compose up -d db adminer pgadmin
cd src/backend
npm install 
cd ../..
npm install