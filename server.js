const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const passport =require("passport")
const app = express();

// const connection = require("./models/connect");

//引入users.js
const users = require("./routers/api/user")
const profiles = require("./routers/api/profiles")

const db = require("./config/keys").mongoURL

mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("mongodb 连接成功"))
.catch(err => console.log("mongodb 连接失败"))

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport)

//使用body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.send("hello word!")
})


//使用routes
app.use("/api/user",users)
app.use("/api/profiles",profiles)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})   
