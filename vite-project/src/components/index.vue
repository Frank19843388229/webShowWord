<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt="logo" class="logo-image" />
        <span class="logo-text">Frank</span>
      </div>
      <nav>
        <el-menu mode="horizontal" router :default-active="route.path">
          <el-menu-item index="/index/home">主页</el-menu-item>
          <el-menu-item index="/index/about">关于</el-menu-item>
          <el-menu-item index="/index/user">用户</el-menu-item>
        </el-menu>
      </nav>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
        <p>&copy; Frank 2025~2026</p>
    </el-footer>
  </el-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.el-container {
  width: 100vw;
  min-height: 100vh;
}
.logo-text {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  color: #333;
}
.el-header {
  height: 70px;
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
}
.logo-image {
  height: 100%;
  width: auto;
}
nav {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.el-main {
  /* 可选：添加 main 样式 */
  background-color: #fff;
  height: auto;
  width: 100vw;
}
.el-footer {
  /* 可选：添加 footer 样式 */
  height: 60px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>