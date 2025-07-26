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
    <template #header>광고성 정보 및 마케팅 수신 동의(선택)</template>
    <template #body>
      <p>
        <strong>"갤럭시 폴더블6 혜택 알림 프로모션"</strong>와 관련하여, SK텔레콤의 상품 안내, 이벤트 행사 관련 정보 안내 목적으로 이메일, SMS를 통한 상품 및 이벤트 정보 송신을 위해 이용할 수 있습니다. 마케팅 및 홍보에 활용을 원하지 않을 경우, 동의하시지 않으셔도 됩니다.
      </p>
      <br/>

      <table>
        <tbody>
        <tr>
          <th>수집/이용<br/>목적</th>
          <td>
            본 서비스와 SK텔레콤이 제공하는 다른상품 및 서비스 안내, 폴더블6 이벤트나 행사 관련 정보 안내
          </td>
        </tr>
        <tr>
          <th>수집 항목</th>
          <td>
            성명, 생년월일, 내/외국인, 이동통신사, 휴대폰 번호,
            사전예약 및 개통 여부
          </td>
        </tr>
        <tr>
          <th>보유 기간</th>
          <td>
            이동전화 서비스 이용기간 또는 고객 요청시 까지
          </td>
        </tr>
        </tbody>
      </table>

      <br/>
      <dl>
        <dd>
          <ul>
            <li>※ 본 동의는 이벤트 응모를 위한 개인정보 처리위탁에 대한 동의로서, 동의를 거부할 권리가 있으나, 동의하지 않으실 경우 이벤트에 응모하실 수 없습니다.</li>
            <li>※ 수집한 개인정보를 개인을 식별할 수 없는 통계자료 등으로 가공하여 이용 또는 제공할 수 있습니다. </li>
            <li>※ SK텔레콤㈜의 상세한 개인정보처리방침은 <a href="https://www.sktelecom.com/view/footer/privacy.do" target="_blank">https://www.sktelecom.com/view/footer/privacy.do</a> 에서 확인하실 수 있습니다. </li>
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
    width: 80px;
    background-color: #cccccc;
    font-weight: $font-weight-medium;
    border: 1px solid #333333;
  }
  td {
    padding: 8px;
    border: 1px solid #333333;
    &.important {
      color: blue;
      font-size: 1.2em;
      font-weight: $font-weight-medium;
      text-decoration: underline;
    }
  }
}
</style>