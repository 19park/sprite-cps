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
    <template #header>개인정보 수집 및 이용 동의(필수)</template>
    <template #body>
      <p>
        <strong>“갤럭시 폴더블6 혜택 알림 프로모션”</strong>와 관련하여, 본인의 개인정보를 SK텔레콤 주식회사가 수집 및 이용하는 것에 대해 동의합니다.
      </p>
      <br/>

      <table>
        <tbody>
          <tr>
            <th>수집/이용<br/>목적</th>
            <td>
              본인 확인, 이벤트 운영, 고객 응대, 당첨자 확인 및 안내, 경품 발송
            </td>
          </tr>
          <tr>
            <th>수집 항목</th>
            <td>
              이름, 생년월일, 휴대폰 번호,
              내/외국인, 이동통신사,휴대폰 번호, 사전예약 및 개통 여부
            </td>
          </tr>
          <tr>
            <th>보유 기간</th>
            <td class="important">
              이벤트 종료 후 당첨자 확인 및
              응대를 위해 당첨자 발표 후
              2개월 동안 보관 후 파기
            </td>
          </tr>
        </tbody>
      </table>

      <br/>
      <dl>
        <dd>
          <ul>
            <li>※ 당첨 고객님에게는 경품 및 제세공과금 처리를 위한 개인정보(주소, 신분증 사본 등) 추가 수집 및 이용에 대한 동의를 요청할 수 있습니다.</li>
            <li>※ 본 동의는 이벤트 응모를 위한 개인정보 수집/이용에 대한 동의로서, 동의를 거부할 권리가 있으나, 동의하지 않으실 경우 이벤트에 응모하실 수 없습니다.</li>
            <li>※ 법령에 따른 개인정보의 수집/이용, 계약의 이행/편의증진을 위한 개인정보 처리위탁 및 개인정보처리와 관련된 일반사항은 서비스의 개인정보처리방침에 따릅니다.</li>
          </ul>
        </dd>
      </dl>
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
    width: 84px;
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