import axios from "axios"
import { Loading,Message } from 'element-ui';
import router from "./router";

let loading;
function startLoading(){
    loading=Loading.service({
        lock:true,
        text:'数据加载中，请稍后...',
        background:'rgba(0.0.0.0.7)'
    });
}

function endLoading(){
    loading.close();
}

//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading();

    if(localStorage.Token){
        config.headers.Authorization=localStorage.Token;
    }

    return config;
},err=>{
    Promise.reject(err)
})

//响应拦截
    axios.interceptors.response.use(response=>{
        //结束动画
        endLoading();
        return response;
    },err=>{
        //错误体香
        endLoading();
        Message.error(err.response.data);

        const {status} = err.response;

        if(status==401){
            Message.error('token失效，请重新登录')
            //清除token
            localStorage.removeItem("Token")

            //重新登录
            router.push("./login")
        }
        return Promise.reject(err)
    })



export default axios;