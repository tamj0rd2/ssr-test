#!/bin/bash
set -e -o pipefail

rm -rf ./dist
echo 'Success: Dist cleaned'

if [[ "$1" == "--dev" ]];
    then {
        echo 'Building for DEVELOPMENT'
        npx babel src --out-dir dist --extensions .ts,.tsx --copy-files --source-maps inline
    };
    else {
        echo 'Building for PRODUCTION'
        ./node_modules/.bin/webpack --color --progress --config ./src/webpack.config.ts
        npx babel src --out-dir dist --extensions .ts,.tsx --copy-files
    };
fi

echo 'Success: Build complete'
