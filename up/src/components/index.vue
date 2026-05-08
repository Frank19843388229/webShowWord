<template>
  <div class="index-container">
    <nav>
      <router-link to="/index/main">用户中心</router-link>
      <router-link to="/index/weather">天气预报</router-link>
    </nav>
    <div class="router-view">
    <router-view></router-view>
    </div>
  </div>
</template>
<style scoped>
.index-container {
  width: 100vw;
  height: auto;
  position: relative;
}
a {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  text-align: center;
  font-size: 20px;
  background-color: red;
  width: 100%;
  height: 30px;
  color: pink;
}
nav {
  padding: 10px;
  width: 15vw;
  display: flex;
  justify-content: flex-start;
  align-items:start;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
}
.router-view {
  width: 85vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
}
</style>