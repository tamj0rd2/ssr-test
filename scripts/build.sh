#!/bin/bash
set -e -o pipefail

rm -rf ./dist
echo 'Success: Dist cleaned'

npx copyfiles ./src/**/*.html ./dist -u 1
echo 'Success: Raw files copied'
echo

if [[ "$1" == '--prod' ]];
    then {
        echo 'BUILDING FOR PRODUCTION'
        ./node_modules/.bin/webpack --color --progress --config ./src/webpack.config.ts --env.production
        npx babel src --out-dir dist --extensions .ts,.tsx
    };
    else {
        echo 'BUILDING FOR DEVELOPMENT'
        npx babel src --out-dir dist --extensions .ts,.tsx --source-maps inline --ignore "src/client/**/*"
    };
fi

echo 'Success: Build complete'
