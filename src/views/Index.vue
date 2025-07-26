<script setup lang="ts">
import Header from "@/views/Header.vue";
import EventShare from "@/views/EventShare.vue";
import {getLinkPath} from "@/assets/utils/link";
import {LinkType} from "@/assets/enums/linkType";
import {trackClickAddEvent} from "@/assets/utils/track";
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isAnimating = ref(false);
const currentFrame = ref(0);
const animationId = ref<NodeJS.Timeout | null>(null);
const spriteImage = ref<HTMLImageElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const clickCount = ref(0);
const startTime = ref<number | null>(null);
const elapsedTime = ref(0);
const timerInterval = ref<NodeJS.Timeout | null>(null);
const clickEffects = ref<Array<{x: number, y: number, opacity: number, id: number}>>([]);

const SPRITE_CONFIG = {
  totalWidth: 2860,
  totalHeight: 600,
  frameWidth: 572,
  frameHeight: 600,
  totalFrames: 5,
  animationSpeed: 100
};

const loadSpriteImage = () => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = import.meta.env.BASE_URL + 'images/sprite.png';
  });
};

const getCanvasSize = () => {
  if (!containerRef.value) return { width: 572, height: 600 };
  
  const containerWidth = containerRef.value.clientWidth;
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    const scale = Math.min(containerWidth / SPRITE_CONFIG.frameWidth, 1);
    return {
      width: SPRITE_CONFIG.frameWidth * scale,
      height: SPRITE_CONFIG.frameHeight * scale
    };
  }
  
  return {
    width: SPRITE_CONFIG.frameWidth,
    height: SPRITE_CONFIG.frameHeight
  };
};

const drawFrame = (frameIndex: number) => {
  if (!canvasRef.value || !spriteImage.value) return;
  
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const { width, height } = getCanvasSize();
  canvas.width = width;
  canvas.height = height;
  
  ctx.clearRect(0, 0, width, height);
  
  const sourceX = frameIndex * SPRITE_CONFIG.frameWidth;
  const sourceY = 0;
  
  ctx.drawImage(
    spriteImage.value,
    sourceX, sourceY,
    SPRITE_CONFIG.frameWidth, SPRITE_CONFIG.frameHeight,
    0, 0,
    width, height
  );
};

const handleClick = (event: TouchEvent | MouseEvent) => {
  event.preventDefault();
  
  // 첫 클릭 시 타이머 시작
  if (!startTime.value) {
    startTime.value = Date.now();
    timerInterval.value = setInterval(() => {
      if (startTime.value) {
        elapsedTime.value = Date.now() - startTime.value;
      }
    }, 10) as NodeJS.Timeout;
  }
  
  clickCount.value++;
  
  // 클릭 이펙트 추가
  if (canvasRef.value) {
    const rect = canvasRef.value.getBoundingClientRect();
    const x = ('touches' in event ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = ('touches' in event ? event.touches[0].clientY : event.clientY) - rect.top;
    
    const effectId = Date.now() + Math.random();
    clickEffects.value.push({ x, y, opacity: 1, id: effectId });
    
    // 이펙트 페이드아웃
    const fadeEffect = () => {
      const effect = clickEffects.value.find(e => e.id === effectId);
      if (effect) {
        effect.opacity -= 0.05;
        if (effect.opacity <= 0) {
          clickEffects.value = clickEffects.value.filter(e => e.id !== effectId);
        } else {
          requestAnimationFrame(fadeEffect);
        }
      }
    };
    requestAnimationFrame(fadeEffect);
  }
  
  startAnimation();
};

const startAnimation = () => {
  if (isAnimating.value) return;
  
  isAnimating.value = true;
  currentFrame.value = 0;
  drawFrame(0);
  
  const animate = () => {
    currentFrame.value++;
    
    if (currentFrame.value >= SPRITE_CONFIG.totalFrames) {
      isAnimating.value = false;
      currentFrame.value = 0;
      drawFrame(0);
      return;
    }
    
    drawFrame(currentFrame.value);
    animationId.value = setTimeout(animate, SPRITE_CONFIG.animationSpeed) as NodeJS.Timeout;
  };
  
  animate();
};

const handleResize = () => {
  if (!isAnimating.value) {
    drawFrame(currentFrame.value);
  }
};

const resetGame = () => {
  clickCount.value = 0;
  elapsedTime.value = 0;
  startTime.value = null;
  currentFrame.value = 0;
  isAnimating.value = false;
  clickEffects.value = [];
  
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
  
  if (animationId.value) {
    clearTimeout(animationId.value);
    animationId.value = null;
  }
  
  drawFrame(0);
};

const formatTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}s`;
};

onMounted(async () => {
  try {
    spriteImage.value = await loadSpriteImage();
    await nextTick();
    drawFrame(0);
    
    window.addEventListener('resize', handleResize);
  } catch (error) {
    console.error('Failed to load sprite image:', error);
  }
});

onUnmounted(() => {
  if (animationId.value) {
    clearTimeout(animationId.value);
  }
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="main w-full max-w-mobile mx-auto">
    <!-- 정보 표시 패널 -->
    <div class="info-panel">
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">클릭 수:</span>
          <span class="stat-value">{{ clickCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">경과 시간:</span>
          <span class="stat-value">{{ formatTime(elapsedTime) }}</span>
        </div>
      </div>
      <button @click="resetGame" class="reset-btn">초기화</button>
    </div>

    <div class="cps-container" ref="containerRef">
      <div class="canvas-wrapper">
        <canvas 
          ref="canvasRef"
          class="sprite-canvas"
          @click="handleClick"
          @touchstart="handleClick"
        ></canvas>
        
        <!-- 클릭 이펙트 -->
        <div 
          v-for="effect in clickEffects" 
          :key="effect.id"
          class="click-effect"
          :style="{
            left: effect.x + 'px',
            top: effect.y + 'px',
            opacity: effect.opacity
          }"
        ></div>
      </div>
    </div>

  </div>

  <!-- <a :href="getLinkPath(LinkType.INSTALL)" target="_blank" @click="trackClickAddEvent" class="btn-float fixed bottom-6 right-6 z-20 flex flex-col items-end">
    <img src="/images/btn_float.png" alt="ZEM 설치하기" class="w-52 h-52" />
  </a> -->
</template>

<style lang="scss" scoped>
.info-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.reset-btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
}

.cps-container {
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

.canvas-wrapper {
  position: relative;
}

.sprite-canvas {
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  max-width: 100%;
  height: auto;
}

.click-effect {
  position: absolute;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(0, 123, 255, 0.8) 30%, rgba(255, 215, 0, 0.6) 70%, transparent 100%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: clickPulse 0.4s ease-out;
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
}

@keyframes clickPulse {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

// 모바일 반응형 스타일 (vw 함수 사용)
@media only screen and (max-width: $mobile-max-width) {
  .info-panel {
    margin: vw(16);
    padding: vw(16);
  }
  
  .stats {
    gap: vw(24);
  }
  
  .stat-label {
    font-size: vw(12);
  }
  
  .stat-value {
    font-size: vw(18);
  }
  
  .reset-btn {
    padding: vw(8) vw(16);
    font-size: vw(14);
  }
  
  .cps-container {
    padding: vw(20);
    min-height: vw(600);
  }
  
  .click-effect {
    width: vw(40);
    height: vw(40);
  }
  
  .btn-float {
    bottom: vw(25) !important;
    right: vw(25) !important;

    img {
      width: vw(207) !important;
      height: vw(207) !important;
    }
  }
}

// 다크모드 대응
@media (prefers-color-scheme: dark) {
  .main {
    background: #fff !important;
  }
}
</style>