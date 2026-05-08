<template>
  <div class="reader">
    <!-- 唯一滚动容器 -->
    <div class="sentence-scroll-container" ref="scrollContainer">
      <div
        v-for="(item, index) in sentences"
        :key="index"
        class="sentence-wrapper"
        :ref="el => el && (sentenceRefs[index] = el)"
      >
        <div class="sentence">
          {{ item }}
        </div>
      </div>
    </div>

    <!-- 页码指示器 -->
    <div class="page-indicator">
      {{ currentPage }} / {{ totalPages }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import poem  from "../store/poem.js"

const poemStore = poem()
const text = ref("")       // 先空着，等接口数据
watch(
  () => poemStore.poem,
  (newText) => {
    if (newText) {
      text.value = newText
    }
  },
  { immediate: true }
)


const sentences = computed(() =>
  text.value.match(/[^。！？；\n]+[。！？；\n]/g) || []
)

// 修复ref收集方式：直接收集wrapper元素
const sentenceRefs = ref([])
const scrollContainer = ref(null)
const currentPage = ref(1)

// 总页数等于句子数量（每页一句）
const totalPages = computed(() => sentences.value.length)

let observer
let scrollHandler = null

// 更精准的激活和页码更新逻辑
const updateCurrentPage = (entries) => {
  entries.forEach(entry => {
    // 只判断完全进入视口且居中的元素
    if (entry.isIntersecting && entry.intersectionRatio > 0.9) {
      // 移除所有active类
      document.querySelectorAll('.sentence').forEach(el => {
        el.classList.remove('active')
      })
      // 给当前元素添加active类
      const sentenceEl = entry.target.querySelector('.sentence')
      if (sentenceEl) {
        sentenceEl.classList.add('active')
      }
      // 更新页码
      const index = sentenceRefs.value.findIndex(el => el === entry.target)
      if (index !== -1) {
        currentPage.value = index + 1
      }
    }
  })
}

onMounted(() => {
  nextTick(() => {
    // 初始化IntersectionObserver
    observer = new IntersectionObserver(updateCurrentPage, {
      threshold: [0.9], // 提高阈值，确保只有完全居中的元素触发
      root: scrollContainer.value,
      rootMargin: '0px'
    })

    // 观察每个sentence-wrapper
    sentenceRefs.value.forEach(el => {
      if (el) observer.observe(el)
    })

    // 备用方案：滚动事件兜底（防止Observer失效）
    scrollHandler = () => {
      const container = scrollContainer.value
      if (!container) return
      
      // 计算当前可视区域的中心位置
      const centerY = container.scrollTop + container.clientHeight / 2
      
      // 遍历所有wrapper找最接近中心的元素
      let closestIndex = 0
      let minDistance = Infinity
      
      sentenceRefs.value.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elCenterY = rect.top + rect.height / 2 + container.scrollTop
        const distance = Math.abs(elCenterY - centerY)
        
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = index
        }
      })
      
      // 更新页码（防抖）
      if (currentPage.value !== closestIndex + 1) {
        currentPage.value = closestIndex + 1
        
        // 更新active类
        document.querySelectorAll('.sentence').forEach(el => {
          el.classList.remove('active')
        })
        const activeEl = sentenceRefs.value[closestIndex]?.querySelector('.sentence')
        if (activeEl) activeEl.classList.add('active')
      }
    }

    // 添加滚动事件监听（兜底）
    scrollContainer.value?.addEventListener('scroll', scrollHandler)
    
    // 初始化：激活第一页
    if (sentenceRefs.value[0]) {
      sentenceRefs.value[0].querySelector('.sentence').classList.add('active')
    }
  })
})

onUnmounted(() => {
  // 清理Observer
  if (observer) {
    sentenceRefs.value.forEach(el => {
      if (el) observer.unobserve(el)
    })
    observer.disconnect()
  }
  
  // 清理滚动事件
  if (scrollHandler && scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style scoped>
.reader {
  position: relative;
  width: 100%;
  height: calc(100vh - 130px);
  overflow: hidden;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* 滚动容器 - 核心优化 */
.sentence-scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 0; /* 移除上下padding，避免滚动偏移 */
}

.sentence-scroll-container::-webkit-scrollbar {
  display: none;
}

/* 每页容器 - 核心优化 */
.sentence-wrapper {
  height: calc(100vh - 130px); /* 与外层容器高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start; /* 改为start对齐，更稳定 */
  scroll-snap-stop: always; /* 强制停在每页 */
  box-sizing: border-box;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  background: url("/image/image/poem.png") center/cover no-repeat;
}

/* 文字容器 */
.sentence {
  position: relative;
  max-width: 800px;
  width: 100%;
  padding: 40px 60px;
  font-size: 20px;
  line-height: 2.2;
  text-align: center;
  word-break: keep-all;
  transition: all 0.35s ease;
  box-sizing: border-box;
  background-color:transparent;
  border-radius: 8px;
  opacity: 0.7;
  transform: scale(0.95);
}

/* 激活状态 */
.sentence.active {
  font-size: 22px;
  font-weight: 500;
  color: #2d5af1;
  opacity: 1;
  transform: scale(1);
}

/* 页码指示器 */
.page-indicator {
  position: absolute;
  bottom: 15px;
  right: 20px;
  padding: 6px 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 10;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .reader {
    height: calc(100vh - 80px);
  }
  
  .sentence-scroll-container {
    height: calc(100vh - 80px);
  }
  
  .sentence-wrapper {
    height: calc(100vh - 80px);
    padding: 0 15px;
  }
  
  .sentence {
    padding: 20px 30px;
    font-size: 18px;
  }

  .sentence.active {
    font-size: 20px;
  }
}
</style>