

// NodeJs 链接 MongoDB 数据库 

// mongoose 

const mongoose = require("mongoose");

// connect 用于创建数据库连接

const hostname = "0.0.0.0";
const port = 27017;
const dbName = "houtai"  // 数据库名称
const user = "?";
const password = "?"

const CONN_DB_STR = `mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(CONN_DB_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});


const connection = mongoose.connection;

// 连接成功
connection.on("connected",()=>{
    console.log('Mongoose connection open to ' + CONN_DB_STR);  
})

// 数据库开启
connection.on("open",()=>{
    console.log('mongoose open')
});

// 链接异常
connection.on('error',err=>{
    console.log('Mongoose connection error: ' + err);  
    // res.json()
})

// 断开链接
connection.on('disconnected',()=>{
    console.log('Mongoose connection fail 链接失败')
})


module.exports = connection;