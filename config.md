**Primeiros passos**
*backend*
- mongodb+srv://<user>:<pwd>@omnistack-guie6.mongodb.net/admin
- npm install express
- criar o scripts: dev -> nodemon src/server.js
- npm run dev
- criar cluster mongo, depois connectar a application nodejs com o mongoDb
- lib p upar imgs -> npm install multer
- npm install socket.io
*frontend*
- npx create-react-app <nome-do-app>
- npm start
- npm install axios
- npm install react-router-dom
- npm install socket.io-client
*mobile*
- npm install -g expo-cli
- expo init <nome-do-projeto>
- npm start (na pasta do proj)
- expo start
- npm install react-navigation
- Caso dê o erro: enospc: system limit for number of file watchers reached,
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
  cat /proc/sys/fs/inotify/max_user_watches
  fs.inotify.max_user_watches=524288
- expo install react-native-gesture-handler react-native-reanimated
- npm install axios
- caso dê algum erro na imagem, alterar o link do path da api
- npm install socket.io-client