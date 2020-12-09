rm -rf .git
git init
npm i
grep -v "init" package.json > tmpfile && mv tmpfile package.json
rm -r .github
git add .
git commit -m "chore(first commit): template from https://github.com/Lissandre/three_template"
rm ./init.sh
