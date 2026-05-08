<template>
  <div class="main">
    <!-- 背景 doodle -->
    <css-doodle class="doodle-bg">
      :doodle {
        @grid: 22 / 70vmin;
        @max-size: 800px 800px;
        background: #475d50;
        border-radius: 4px;
        overflow: hidden;
        contain: initial;
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bloom {
          0% { transform: scale(0.8); }
          100% { transform: scale(1.1); }
        }
      }
      --c: @p(#e8aa3e, #d7e2eb, #dcc6f5); 
      @place-cell: center;
      @random(0.7) {
        z-index: 1;
        :after {
          content: '';
          transform: translate(@m2(@r(±36vmin))) rotate(@r(360deg));
          @size: 6vmin;
          background: @doodle(
            @grid: 3x4 / 100% 100%;
            @size: 20%;
            @place-cell: center;
            border-radius: 0 100% 0 100%;
            background: var(--c);
            opacity: @r(0.7, 1);
            transform: rotate(@r(360deg));
            transform-origin: center center;
          );
          animation: spin @r(8, 20)s linear infinite;
        }
        @match(i > 6) {
          :after {
            animation: spin @r(8, 20)s linear infinite, bloom @r(3, 6)s ease-in-out infinite alternate;
          }
        }
        @match(i > 11) {
          :after {
            :after {
              content: '';
              z-index: 1;
              position: absolute;
              top: -25%;
              left: -25%;
              @size: 50%;
              background: #d4603c;
              border: 0.5px solid rgba(0, 0, 0, 0.2);
              border-radius: 100%;
              animation: pulse @r(2, 4)s ease-in-out infinite alternate;
            }
          }
        }
      }
      :before {
        content: '';
        @size: @r(1, 2)vmin;
        border-radius: 100% 0 100% 0;
        background: @p(#aec58d, #7c9852);
        transform: translate(@m2(@r(±32vmin))) rotate(@r(360deg));
        filter: drop-shadow(0.5px 0.5px 0.5px rgba(0, 0, 0, 0.7)) blur(@p(0, 1px));
        opacity: @r(0.6, 1);
        animation: float @r(3, 6)s ease-in-out infinite alternate, sway @r(2, 4)s ease-in-out infinite alternate;
      }
    </css-doodle>

    <!-- 加载状态 -->
    <div v-if="store.isLoading" class="card">正在加载天气数据...</div>

    <!-- 错误提示 -->
    <div v-else-if="store.error" class="card">{{ store.error }}</div>

    <!-- 天气卡片 -->
    <div v-else-if="store.data && store.data.shi" class="card">
      <h1>{{ store.data.shi }} 天气预报</h1>

      <div class="today">
        <img :src="store.data.weather1img" alt="weather icon" />
        <p>{{ store.data.weather1 }}  |  {{ store.data.wd1 }}℃</p>
        <p>体感温度: {{ store.data.nowinfo.feelst }}℃</p>
        <p>湿度: {{ store.data.nowinfo.humidity }}%</p>
        <p>风向: {{ store.data.nowinfo.windDirection }} {{ store.data.nowinfo.windScale }}</p>
      </div>

      <div class="tomorrow">
        <img :src="store.data.weather2img" alt="weather icon" />
        <p>{{ store.data.weather2 }}  |  {{ store.data.wd2 }}℃</p>
      </div>

      <!-- 预警 -->
      <div v-if="store.data.alarm" class="alarm">
        <h3>⚠️ {{ store.data.alarm.title }}</h3>
        <p>生效时间: {{ store.data.alarm.effective }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import weatherStore from '../store/weatherStore'
import { onMounted } from 'vue'

const store = weatherStore()

onMounted(() => {
  store.getWeather()
})
</script>

<style scoped>
.doodle-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.main {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
  width: 320px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  text-align: center;
}

.today, .tomorrow {
  margin: 1rem 0;
}

img {
  width: 60px;
  height: 60px;
}

.alarm {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 12px;
  color: #856404;
}
</style>