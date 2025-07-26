<template>
  <div class="fab-container">
    <transition name="fade">
      <div v-if="isOpen" class="fab-items">
        <slot name="items">
          <!-- 기본 아이템들 -->
          <a v-for="i in 3" :key="i" class="fab-item">
            Item {{ i }}
          </a>
        </slot>
      </div>
    </transition>
    <div @click="toggleMenu" class="fab-trigger-wrapper" :class="{ 'active': isOpen }">
      <!-- 기본 트리거 -->
      <a href="javascript:void(0)" class="fab-trigger">
        <span v-html="toggleText"></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

interface IProps {
  triggerText?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  triggerText: '+',
});

const isOpen = ref(false);
const initialText = ref(props.triggerText);
const toggleText = computed(() => (isOpen.value ? 'x' : initialText.value));

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped lang="scss">
.fab-container {
  position: fixed;
  bottom: 27px;
  right: 27px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 20;
}

.fab-trigger-wrapper {
  .fab-trigger {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    font-size: 27px;
    font-weight: $font-weight-bold;
    /*background-color: #5872FF;*/
    width: 165px;
    height: 165px;
    border-radius: 50%;
    box-shadow: 0 7px 6px rgba(0, 0, 0, .36);
    background-image: url(/images/btn_float_bg.png);
    background-position: center;
    background-size: 100%;
  }
  &.active {
    .fab-trigger {
      font-size: 80px;
      font-weight: $font-weight-light;
    }
  }
}

.fab-items {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
}

.fab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}


@media only screen and (max-width: $mobile-max-width) {
  .fab-trigger-wrapper {
    .fab-trigger {
      width: vw(165);
      height: vw(165);
      font-size: vw(27);
    }
    &.active {
      .fab-trigger {
        font-size: vw(80);
      }
    }
  }

  .fab-items {
    margin-bottom: vw(10);
  }

  .fab-item {
    margin-bottom: vw(17);
  }
}
</style>