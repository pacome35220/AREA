#!/bin/sh
set -e
echo "Configuring Git"
git config --global push.default simple # we only want to push one branch — master
# specify the repo on the live server as a remote repo, and name it 'production'
# <user> here is the separate user you created for deploying
echo "Configuring Remote"
git remote add production ssh://marco@51.77.202.182:4242/home/marco/apps/AREA
echo "Pushing to Remote Server"
git push production master --force # push our updates
echo "Connecting to Server"
ssh deploy@51.77.202.182 -p 4242 "bash -c 'cd /home/marco/apps/AREA && source .travis/.production_env && docker-compose up --build -d client_web docs && sudo cp /home/marco/area.apk /var/lib/docker/volumes/area_common-data/_data/'"
