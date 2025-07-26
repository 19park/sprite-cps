<script setup lang="ts">
import {ref, watch, withDefaults} from "vue";

interface IPopupProps {
  modelValue: boolean;
}

const props = withDefaults(defineProps<IPopupProps>(), {
});

interface IPopupEmits {
  (eventName: 'update:modelValue', value: boolean): void,
  (eventName: 'close', value?: any): void,
}
const emits = defineEmits<IPopupEmits>();

const $body = document.body;
watch(() => props.modelValue, value => {
  if (value) {
    $body.style.overflow = 'hidden';
  } else {
    $body.style.overflow = 'auto';
  }
}, {immediate: true});
</script>

<template>
  <transition name="fade">
    <div class="modal-mask" v-if="props.modelValue">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header font-bold">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                닫기
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 1050;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: vw(730);
  min-width: 300px;
  max-width: 730px;
  max-height: calc(var(--vh, 1vh) * 100);
  overflow-y: auto;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header {
  padding: 18px 24px;
  font-size: 20px;
  text-align: center;
}

.modal-body {
  overflow-y: auto;
  max-height: calc(var(--vh, 1vh) * 76);
  padding: 16px 24px;
  font-size: 16px;

  /* 스크롤바의 폭 너비 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: #ddd;
  }
}

.modal-footer {
  padding: 16px 24px;
  text-align: right;

  .modal-default-button {
    background-color: #333333;
    padding: 14px 26px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 1.2rem;
  }
}

// fade
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>