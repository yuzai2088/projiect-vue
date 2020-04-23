const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Create Schema

var users_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// 如果需要在Schema定义后添加其他字段，可以使用add()方法



// Model 模型  
// Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为
// Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作
// model是由schema生成的模型，可以对数据库的操作


exports.User = mongoose.model('user',users_schema);