const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const keys = require("../../config/keys")
const passport = require("passport")


const { User } = require("../../models/user")
//测试接口
router.get("/test", (req, res) => {
    User.find().then(result => {
        console.log("test", result)
        res.json({
            msg: "success",
            result
        })
    })
})

// 用户注册模块
router.post("/register", (req, res) => {
    // console.log(req.body)
    // 查询数据库是有邮箱
    User.findOne(
        {
            email: req.body.email
        }
    ).then(user => {
        if (user) {
            return res.status(400).json('邮箱已被注册!');
        } else {
            const pic = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2,
                pic,
                identity: req.body.identity
            })

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;
                    newUser.save().then(user => {
                        res.json({ user })
                    }).catch(err => {
                        console.log(err)
                    })
                })
            })
        }
    })

})

// 用户登录模块
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        // 判断用户是否存在
        if (!user) {
            return res.status(404).json('用户不存在!');
        } else {
            // 用户存在
            // 密码匹配
            bcrypt.compare(password, user.password).then(result => {
                if (result) {
                    // 获取token令牌
                    const rule = {
                        id: user.id,
                        name: user.name,
                        pic: user.pic,
                        identity: user.identity
                    }
                    /////////规则、加密名字、、、、、过期时间、、、、、、箭头函数
                    jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: "Bearer " + token
                            //////前缀必须固定Bearer+空格
                        })
                    })
                    // res.json(
                    //     {
                    //         code: 200,
                    //         msg: "密码正确"
                    //     }
                    // )
                } else {
                    return res.status(400).json('密码错误!');
                }
            })
        }

    })
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})




module.exports = router