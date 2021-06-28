const express = require('express')
const app = express()
const port = 5000



// DB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://zero:1234@study.glolh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // 에러가 안뜨도록.
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})