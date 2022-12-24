# node-react-basic
--------------------------------------------------------------------------------
1 강
---
1-1. node 설치. VS Code 설치
-----------------
나머지는 필수 아님.

1. NVM 설치 : github.com/coreybutler/nvm-windows/releases -> nvm-setup.zip 다운로드 후 설치
2. 노드버전 설치 : nvm install 10.16.0 64  (64는 컴퓨터 bit)
3. 노드버전 변경 : nvm use 10.16.0
4. 버전 확인 : node -v

2-1. 폴더 생성 후 기본파일 생성
-----------------
npm init (package.json 파일 생성 author에 이름 적어줌. 기본값 엔터)

3-1. index.js 생성 후 express 설치
----------------
1. npm install express --save (package.json의 dependencies에 자동 추가)
2. https://expressjs.com/en/starter/hello-world.html Hello world example 복사 후 index.js에 붙여 넣기.

4-1. 서버 start 명령어 추가 
----------------
1. package.json 파일의 script에 "start": "node index.js" 추가.
2. npm run start 후 localhost:{port} 로 접속 하면 node 서버 확인가능

2 강
---
1-1. MongoDB
---------------
https://www.mongodb.com/

1. DEPLOYMENT-> DATABASE 우측상단 CREATE 버튼 클릭. (CREATE NEW CLUSTER)
2. 서버(AWS, google, azure), 서버위치(서울) , Cluster Tier M0(무료) , Cluster name 설정
3. 유저생성. cluster에 connect 버튼 클릭 -> create mongodb user 계정 생성 -> connect your application 클릭 -> mongodb+srv: 전체 복사

2-1. mongoose 설치
---------------
1. 최신버전 오류날수 있으니 package.json dependencies 추가. "mongoose": "^5.12.14" -> npm install
2. 아까 복사해 놓은 uri 복사후 index.js에 아래와 같이 만들어 준다.
const mongoose = require('mongoose') 
mongoose.connect('mongodb+srv://계정:패스워드@node-react-basic.8s3xciu.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
3. 서버 내린 후 다시 npm run start -> MongoDB Connected... 나오면 정상적으로 접속

3 강
---
1-1. Model & Schema 생성
---------------
1. models 폴더 생성.
2. models/User.js 파일 생성 (User_1.js 참조)

4 강
---
1-1. GIT 설치
---------------
1. https://git-scm.com/ 다운로드 후 설치.
2. git --version 으로 설치 확인.(바로 확인 안될땐 VSCode 재실행 후 확인)
3. git init (깃 저장소 생성)
4. .gitignore 파일 생성. node_modules 추가하면 해당 폴더는 git저장소에 포함되지 않는다.
5. git add . (node_modules 가 빠져있는지 확인) -> git status
6. git commit -m " 메시지 "  -> 처음엔 안됨. github 설정 해줘야함.

5 강
---
1-1. github repositories 생성
---------------
1. git bash 실행 후 ls -a ~/.ssh (id_rsa id_rsa.pub 파일 없으면)
2. 구글에서 git ssh generating 검색후 Generating a new SSH key and adding it to the ssh-agent 진입
3. ssh-keygen -t rsa -b 4096 -C "your_email@example.com" 


