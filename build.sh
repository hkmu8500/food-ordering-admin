# !/bin/bash

if [ "$CF_PAGES_BRANCH" == "main" ]; then
    # Run the "build" script in `package.json` on the "main" branch

  npm run build

elif [ "$CF_PAGES_BRANCH" == "preview" ]; then
    # Run the "build" script in `package.json` on the "preview" branch

  npm run build

else
    # Run the "build:dev" script in `package.json` on other branches
  npm run build:dev
fi