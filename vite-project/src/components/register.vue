<template>
  <div class="login-page">
    <div class="login-shell">
      <!-- 左侧轮播 -->
      <div class="login-banner">
        <el-carousel
          autoplay
          indicator-position="outside"
          arrow="hover"
        >
          <el-carousel-item v-for="a in introduction" :key="a.id">
            <div class="banner-item">
              <img :src="`/image/image/${a.id}.png`" />
              <div class="banner-mask"></div>
              <div class="banner-text">
                <h1>{{ a.chara }}</h1>
                <p>{{ a.desc }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 右侧登录 -->
      <div class="login-box">
        <h2 class="title">Welcome Back</h2>

        <el-form ref="loginFormRef" class="login-form">
          <el-form-item prop="username">
            <el-input
              v-model="username"
              placeholder="用户名"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="password"
              type="password"
              placeholder="密码"
              size="large"
              show-password
            />
          </el-form-item>

          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="register"
          >
            注　册
          </el-button>

          <router-link to="/login" class="register">
            已有账号？点我登录
          </router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'; 
import axios from 'axios';
  const introduction=reactive([
    {id:1,chara:'诸葛亮',desc:'诸葛亮（181年—234年10月8日），字孔明，号卧龙，汉族，琅琊阳都（今山东省沂南县）人 ，三国时期蜀汉丞相，中国古代杰出的政治家、军事家、战略家 、发明家、文学家。'},
    {id:2,chara:'皇甫嵩',desc:'皇甫嵩（？—195年），字义真，安定朝那（今甘肃平凉西北，一说今宁夏固原东南）人, 名将皇甫规之侄，雁门太守皇甫节之子，中国东汉末年镇压黄巾起义的重要将领。'},
    {id:3,chara:'陆逊',desc:'陆逊（183年－245年3月19日），本名陆议，字伯言，吴郡吴县（今江苏苏州）人 ，汉末三国时期吴国政治家、军事家。'},
    {id:4,chara:'关羽',desc:'关羽（160年—220年），字云长，本字长生 ，河东郡解县（今山西省运城市盐湖区解州镇）人。东汉末年名将。'},
  ])
  const route=useRouter()
  const username=ref('')
  const password=ref('')
  const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/
const register = async () => {
  if (!username.value) {
    ElMessage.error('用户名不能为空！')
    return
  }
  if (!USERNAME_REGEX.test(username.value)) {
    ElMessage.error('用户名只能包含字母和数字，长度 3-20')
    return
  }
  if (!password.value) {
    ElMessage.error('密码不能为空！')
    return
  }
  if (password.value.length < 6) {
    ElMessage.error('密码至少 6 位')
    return
  }

  await axios.post(`http://localhost:8080/register`, {
    username: username.value,
    password: password.value
  }).then(res => {
    ElMessage.success(res.data.message || '注册成功')
    setTimeout(() => {
      route.push('/')
    }, 1000)
  }).catch(err => {
    ElMessage.error(
      err.response?.data?.error || '注册失败，请稍后重试'
    )
    console.error('注册请求失败:', err)
  })
}


</script>

<style scoped>
/* 页面背景 */
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 主容器 */
.login-shell {
  width: 1000px;
  height: 560px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
}

/* 左侧轮播 */
.login-banner {
  flex: 1.2;
  height: 100%;
  background: #000;
}

/* ⭐ 关键：Element Plus 高度穿透 */
.login-banner :deep(.el-carousel),
.login-banner :deep(.el-carousel__container),
.login-banner :deep(.el-carousel__item) {
  height: 100%;
}

.banner-item {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 图片 */
.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 渐变遮罩 */
.banner-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65),
    rgba(0, 0, 0, 0.1)
  );
}

/* 文本 */
.banner-text {
  position: absolute;
  left: 6%;
  bottom: 10%;
  max-width: 420px;
  color: #fff;
}

.banner-text h1 {
  font-size: 2rem;
  font-weight: 700;
}

.banner-text p {
  margin-top: 12px;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* 右侧登录 */
.login-box {
  flex: 1;
  background: #fff;
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 32px;
}

.login-form .el-form-item {
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
  height: 46px;
  font-weight: 600;
}

.register {
  display: block;
  margin-top: 14px;
  text-align: center;
  font-size: 0.9rem;
  color: #64748b;
}
</style>
