const express = require("express")
const app = express()
const port = 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,token, Access-Control-Request-Method, Access-Control-Request-Headers');
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});
// создание сессии
app.use(require('./connection/session'));

// модуль
app.use(require('./authRouter'));

// app.get('/sessionCheck',function(req,res) {
//     res.send(req.session)
// })
// app.get('/login',function(req,res){
//     // const { username , password} = req.body
//     // console.log(req.body)
//     // if(username !== userData.username || password !== userData.password){
//     //     return res.status(401).json({
//     //         error: true,
//     //         message: "Username or Password is invalid"
//     //     })
//     // }
//     // else{
//     //     req.session.userinfo = userData.fullname
//     //     res.send(req.session.userinfo)
//     // }
//     req.session.userinfo = "logged_in"
//         res.send(req.session)
//     console.log("login")
// })
//
// app.get('/logout', function(req,res){
//     req.session.destroy(function(err){
//         if(!err){
//             res.send("Log Out!")
//         }
//     })
// })
//
//
app.post('/isLogin', function(req,res){
    if(req.session.userinfo){
        res.json({user: req.session.userinfo})
    }
    else{
        res.json({user: "", error: "Не авторизован"})
    }
})
//
// app.use(require('./users'));


try {
    app.listen(port,()=> console.log(`Server Started on port ${port}...`))
} catch (e) {
    console.log("Сервер не запущен.")
}
