<script setup lang="ts">
import {computed, watch, withDefaults} from "vue";
import Popup from "@/components/molecules/Popup.vue";

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

// modelValue proxy
const proxy = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
  }
});

function onClose(update: boolean) {
  emits('update:modelValue', false);
  emits('close', update);
}
</script>

<template>
  <Popup
      v-model="proxy"
      @close="onClose(false)">
    <template #header></template>
    <template #body>
      <img src="/images/popup/img_winner.png" alt="당첨자 팝업 이미지"/>

      <a href="javascript:;" class="btn-close" @click="onClose">
        <img src="/images/popup/btn_close.png" alt="닫기"/>
      </a>
    </template>
    <template #footer></template>
  </Popup>
</template>

<style scoped lang="scss">
:deep(.modal-container) {
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;

  &::-webkit-scrollbar {
    opacity: 0;
  }

  .modal-body {
    position: relative;
    padding: 12px 0 0 0;
    max-height: initial;
    font-size: 0;
    img {
      font-size: 0;
    }

    a.btn-close {
      position: absolute;
      right: 40px;
      top: 50px;
      width: 40px;
    }
  }
  .modal-header, .modal-footer {
    display: none;
  }
}

@media only screen and (max-width: $mobile-max-width) {
  :deep(.modal-container) {
    .modal-body {
      a.btn-close {
        right: vw(40);
        top: 3%;
        width: vw(40);
      }
    }
  }
}
</style>