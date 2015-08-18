#!/usr/bin/env bash

npm install
mkdir data && node scripts/initialize_db.js data/quiz.db
