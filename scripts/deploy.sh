#!/usr/bin/env sh

# abort on errors
set -ev

# setup git
git config --global user.name tizee-bot
git config --global user.email pobomp@gmail.com
git config --global push.default simple

# navigate to build output directory
cd docs/.vuepress/dist

git init
git add --all
git commit -m ':books: auto deploy'
# list remote
git remote -v
# push 
git push -f -q "https://$GITHUB_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" HEAD:master > /dev/null 2>&1

