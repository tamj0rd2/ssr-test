rm -rf ./dist
echo DIST CLEANED
npx babel src --out-dir dist --extensions .ts,.tsx --copy-files ${@}
