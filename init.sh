rm -rf .git
git init
npm i
grep -v "init" package.json > tmpfile && mv tmpfile package.json
rm -r .github
rm ./init.sh