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
        10% { opacity: 1; }
        95% { transform: translateZ(35vmin) rotateZ(var(--deg)); }
      }
    </css-doodle>

    <div class="text">
      <span
        v-for="(char, index) in `404\rNOT\rFOUND!!!\n114514\n1919810`"
        :key="index"
        :class="`text-part${index % 2 === 0 ? '1' : '2'}`"
        :style="{ '--char-index': index }"
      >
        {{ char }}
      </span>
    </div>
  </div>
</template>

<script setup>
import 'css-doodle';
</script>

<style scoped>
.text {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 6vmin;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-align: center;
  gap: 2px;
  z-index: 100;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  letter-spacing: 2px;
  white-space: pre-wrap;
}

@keyframes textShake {
  0%, 100% { transform: translate(0, 0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-1px, 2px); }
  80% { transform: translate(1px, -2px); }
}

.text span {
  animation: textShake 0.5s ease-in-out infinite;
  animation-delay: calc(0.02s * var(--char-index));
  transform-origin: center;
  display: inline-block;
}

.text-part1 {
  color: #ffffff;
  text-shadow: 0 0 15px #fff;
}

.text-part2 {
  color: #ff3569;
  text-shadow: 0 0 15px #ff000080;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.xbg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>