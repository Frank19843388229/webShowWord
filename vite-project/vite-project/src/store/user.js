import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router/index.js";
import { defineStore } from "pinia";

export default userStore = defineStore("user", {
  state(){
    return {
        username:"",
        password:""
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
  actions:{
    login(){
    if(this.username===''){
      ElMessage.error('用户名不能为空！')
    }else if(this.password===''){
      ElMessage.error('密码不能为空！')
    }else if(this.username!==''&&this.password!==''){
      axios.post('http://localhost:8080/login',{
        username:this.username,
        password:this.password 
      }).then(res=>{
        if(res.data!==""){
          ElMessage.success('登录成功！'  )
          setTimeout(()=>{
            router.push('/index/home')
          },1000)
        }else if(res.data==""){
          ElMessage.error('用户名或密码错误，请重新输入！')
        }
      }).catch(err=>{
        ElMessage.error('登录请求失败，请稍后重试！')
      })
    }
  },
  register(){
    if(this.username===''){
      ElMessage.error('用户名不能为空！')
    }else if(this.password===''){
      ElMessage.error('密码不能为空！')
    }else if(this.username!==''&&this.password!==''){
      axios.post('http://localhost:8080/register',{
        username:this.username,
        password:this.password 
      }).then(res=>{
        if(res.data==="用户名已存在"){
          ElMessage.error('用户名已存在！')
        }
        if(res.data==="注册成功"){
          ElMessage.success('注册成功！请登录！')
          setTimeout(()=>{
          route.push('/login')
          },1000)
        }
      }).catch(err=>{
        ElMessage.error('注册请求失败，请稍后重试！')
      })
    }
    
  }
  }
});