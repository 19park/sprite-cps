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
  (eventName: 'close', value?: any): void, // 닫기
  (eventName: 'refuse'): void, // 받지않고 뽑기
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
      <img src="/images/popup/marketing-agree/title.png" alt="‘마케팅 활용 및 광고 수신‘ 에 동의하셔야 [100% 당첨 스마일캐시 1,500원]을 받으실 수 있습니다."/>
    </template>
    <template #footer>
      <div class="button-container">
        <a href="javascript:;" @click="emits('refuse')">
          <img src="/images/popup/marketing-agree/btn-refuse.png" alt="스마일캐시 1,500원 받지 않고 사전 예약 혜택 뽑기"/>
        </a>
        <a href="javascript:;" @click="onClose(false)">
          <img class="tooltip" src="/images/popup/marketing-agree/btn-agree.tooltip.png" alt="100% 바로 당첨!"/>
          <img src="/images/popup/marketing-agree/btn-agree.png" alt="혜택 알림 수신 동의하고 스마일캐시 1,500원 받기"/>
        </a>
      </div>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
:deep(.modal-container) {
  background-color: transparent;
  box-shadow: none;
  border-radius: 20px;

  .modal-header {
    display: none;
  }
  .modal-body {
    background-color: #FFFFFF;
    position: relative;
    padding: 55px 55px 86px;
    max-height: initial;
    text-align: center;
    font-size: 0;
    img {
      font-size: 0;
      width: 619px;
    }
  }
  .modal-footer {
    padding: 0;
    .button-container {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        position: relative;
        display: block;
        .tooltip {
          position: absolute;
          top: -63px;
          left: 50%;
          transform: translateX(-50%);
          width: 238px;
        }
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  :deep(.modal-container) {
    .modal-body {
      padding: vw(55 55 86);
      img {
        width: vw(619);
      }
    }
    .modal-footer {
      .button-container {
        a {
          .tooltip {
            top: vw(-63);
            width: vw(238);
          }
        }
      }
    }
  }
}
</style>