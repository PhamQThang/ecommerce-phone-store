#!/usr/bin/env bash
set -e

# ./wait-for-it.sh postgres:5432
npm run migration:run
npm run seed:run:relational
npm run start:dev
