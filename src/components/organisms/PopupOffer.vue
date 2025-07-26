<script setup lang="ts">
import {computed, withDefaults} from "vue";
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
    <template #header>개인정보 처리의 위탁 동의(필수)</template>
    <template #body>
      <p>
        <strong class="font-semibold">"갤럭시 폴더블6 혜택 알림 프로모션"</strong>와 관련하여, 본인의 개인정보처리 업무를 위탁합니다.
      </p>
      <br/>

      <table>
        <tbody>
        <tr>
          <th class="font-semibold">수탁사</th>
          <td>
            본애드컴㈜(운영대행사)
          </td>
        </tr>
        <tr>
          <th class="font-semibold">업무 내용</th>
          <td>
            이벤트 운영, 경품 당첨자 확인 및 배송, 고객 상담 업무
          </td>
        </tr>
        </tbody>
      </table>

      <br/>
      <p>※ 본 동의는 이벤트 응모를 위한 개인정보 처리위탁에 대한 동의로서, 동의를 거부할 권리가 있으나, 동의하지 않으실 경우 이벤트에 응모하실 수 없습니다.</p>
      <p>※ 본 이벤트는 수집된 개인정보를 본애드컴에 처리 위탁하여 경품 당첨자 추천 및 안내 업무를 처리합니다.</p>
      <br/>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border: 1px solid #333333;
  border-spacing: 0 0;

  th {
    padding: 8px;
    width: 80px;
    background-color: #cccccc;
    border: 1px solid #333333;
  }
  td {
    padding: 8px;
    border: 1px solid #333333;
    &.important {
      color: blue;
      font-size: 1.2em;
      text-decoration: underline;
    }
  }
}
</style>