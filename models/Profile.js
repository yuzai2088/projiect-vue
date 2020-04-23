const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Create Schema

var Profile_schema = new Schema({
    
    type:{
        type:String,
    },
    describe:{
        type:String,
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
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


exports.Profile = mongoose.model('profile',Profile_schema);