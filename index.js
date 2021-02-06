const express = require('express') // express 모듈을 가져옴.
const app = express() // 새로운 express 앱을 만듦.
const port = 5000 // 포트 번호.
const bodyParser = require('body-parser');

const config = require('./config/key'); // 몽고DB key값 바인딩.

const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')

// 몽구스DB 연결 및 깃허브에 업로드 시 제외.
mongoose.connect(config.mongoURI, {

    // 몽고DB 기본 환경설정(안하면 에러뜸).
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! 안녕하세요><'))

app.post('/register', (req, res) => {

    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
    const user = new User(req.body)
  
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({ success: true})
    })
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))