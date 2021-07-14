const { User } = require('../model/User');

// 인증 처리를 하는곳
let auth = (req, res, next) => {
    // client 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    // 토큰을 복호화 한 후 유저를 찾는다.
    // 유저가 있으면 인증 성공
    // 유저가 없으면 인증 실패
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, err: true })
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };