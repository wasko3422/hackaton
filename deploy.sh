cd ./frontend
yarn
yarn build
cd ..
git add .
git commit -m Deploy
git remote add azure "https://wasko3422@hackaton-myald.scm.azurewebsites.net/hackaton-myald.git"
git push azure master --force
git reset --hard HEAD~1
