#!/bin/bash
rm -rf .git
rm -r .github
npm i
git init
git add .
git commit -m "chore(first commit): template from https://github.com/Lissandre/three_template"
grep -v "init" package.json > tmpfile && mv tmpfile package.json
rm ./init.sh
