<template>
  <div class="bg">
    <css-doodle class="xbg" grid="100">
  --color: #51eaea, #fffde1, #ff9d76, #FB3569;

  @grid: 30x1 / 100vw 100vh / #270f34; 
  
  :container {
    perspective: 30vmin;
    --deg: @p(-180deg, 180deg);
  }
  
  :after, :before {
    content: '';
    background: @p(--color); 
    @place: @r(100%) @r(100%);
    @size: @r(6px);
    @shape: heart;
  }

  @place: center;
  @size: 18vmin; 

  box-shadow: @m2(0 0 50px @p(--color));
  background: @m100(
    radial-gradient(@p(--color) 50%, transparent 0) 
    @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
    no-repeat
  );

  will-change: transform, opacity;
  animation: scale-up 12s linear infinite;
  animation-delay: calc(-12s / @I * @i);

  @keyframes scale-up {
    0%, 95.01%, 100% {
      transform: translateZ(0) rotate(0);
      opacity: 0;
    }
    10% { 
      opacity: 1; 
    }
    95% {
      transform: 
        translateZ(35vmin) rotateZ(var(--deg));
    }
  }
    </css-doodle>
  <div class="form-area">
    <h1>欢迎来到天气预报查询</h1>
    <div class="form-group">
      <css-doodle 
        class="doodle-bg" 
        grid="100"
      >
    :doodle {
        @size: 400px 400px;
        perspective: 10px;
    }
    
    position: absolute;
    top: @r(1%, 100%);
    left: @r(1%, 100%);
    width: 2px;
    height: 2px;
    background: #000;
    border-radius: 50%;
    background: hsl(@r(1, 255, 3), @r(10%, 90%), @r(10%, 90%));
    transform: rotate(@r(360deg)) translate(@r(-50, 50)vmin, @r(-50, 50)vmin);
    animation: move 3s infinite linear alternate;
    zoom: @rn(.1, 5, 3);
    @keyframes move {
        100% {
            transform: rotate(0) translate(0, 0);
        }
    }
      </css-doodle>

      <h1 class="form-title">用户注册</h1>
      
      <div class="form-item">
        <label for="username" class="form-label">用户名</label>
        <input
          type="text"
          id="username"
          placeholder="请输入用户名/手机号"
          v-model="user.username"
          class="form-input"
          v-foucs
        >
      </div>

      <div class="form-item">
        <label for="password" class="form-label">密码</label>
        <input
          type="password"
          id="password"
          placeholder="请输入6-20位密码"
          v-model="user.password"
          class="form-input"
        >
      </div>
      <span>{{ errorStr }}</span>
      <button 
        class="form-btn" 
        @click="register" 
      >注册
      </button>

    </div>
    <span class="register" @click="router.push({name:'login'})">已有账号？登录点这里</span>
  </div>
  </div>
</template>

<script setup>
import 'css-doodle';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '../store/userStore';
const router = useRouter();
const user = userStore();
const errorStr=ref('');
const vFoucs={
  onMounted(el,binding){
    el.focus();
    console.log(binding);
    
  }
}
function register() { 
  if(user.username==''||user.password==''){
    errorStr.value='请输入用户名或密码';
    return;
  }
  user.setData();
  router.push({name:'login'});
}
</script>

<style scoped>
.register{
  color: #fff;
  text-decoration: underline;
  z-index: 100;
}
h1{
  text-align: center;
  z-index: 100;
  color: #fff;
  margin: 50px;
}
.bg {
  width: 100vw;
  height: 100vh;
  background: #000;
position: relative;
}
.xbg{
  width: 100%;
  background: #000;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.form-area {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background: #f0f4f8;
}

.form-group {
  opacity: 0.98;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.doodle-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
}

.form-title {
  margin: 0 0 8px;
  font-size: 24px;
  color: #333;
  text-align: center;
  font-weight: 600;
  width: 100%;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.form-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}
.form-input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.form-btn {
  width: 100%;
  padding: 13px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s;
}
.form-btn:hover:not(:disabled) {
  background: #359e75;
}
.form-btn:disabled {
  background: #a3d9b5;
  cursor: not-allowed;
}

.form-link {
  width: 100%;
  text-align: right;
}
.form-link a {
  font-size: 13px;
  color: #42b983;
  text-decoration: none;
}
.form-link a:hover {
  text-decoration: underline;
}
</style>