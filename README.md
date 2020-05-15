cd learn_project/chinese-poetry-server

git pull origin master

npm install

forever start --minUptime 1000 --spinSleepTime 1000 -a  ./bin/www