const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./model/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

// DB 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러가 안뜨도록.
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!111')
})

app.get('/api/hello', (req, res) => {
  res.send("안녕~")
})

// 회원가입 
app.post('/api/users/register', (req, res) => {
  // 회원 가입에 필요한 정보들을 client 에서 받음
  // 그 정보를 데이터 베이스에 넣어준다.(mongodb)
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

// 로그인
app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일 주소를 찾을 수 없습니다."
      })
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch ) => {
      if(!isMatch) // 비밀번호가 같지 않다면
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      // 비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰을 저장한다. 쿠키, 로컬스토리지 등등 여러군데 저장 가능. 지금은 쿠키에 저장.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// auth
app.get('/api/users/auth', auth , (req, res) => {
  // 여기 까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role 0 일반유저, 0이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth , (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, 
    { token: "" } , 
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})