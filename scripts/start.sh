#!/bin/bash
set -e -o pipefail

if [[ "$NODE_ENV" == 'production' ]];
    then {
        echo 'STARTING PRODUCTION'
        NODE_ENV=production node ./dist/server/index.js
    };
    else {
        echo 'STARTING DEVELOPMENT'
        npx concurrently \
            'babel src/client --out-dir dist/client --extensions .ts,.tsx --source-maps inline --watch' \
            'wait-on ./dist/server/index.js && node -r source-map-support/register --inspect ./dist/server/index.js'
    };
fi
