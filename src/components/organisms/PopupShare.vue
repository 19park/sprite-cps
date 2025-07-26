<script setup lang="ts">
import {computed, withDefaults} from "vue";
import Popup from "@/components/molecules/Popup.vue";
import Alert from "@/assets/utils/alert";
import {shareSnsLink} from "@/assets/utils";
import {getLinkPath} from "@/assets/utils/link";
import {LinkType} from "@/assets/enums/linkType";

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
function onCopySuccess() {
  Alert.success("복사가 완료되었습니다. 링크를 공유해주세요.")
}
</script>

<template>
  <Popup
      v-model="proxy"
      :width="660"
      @close="onClose(false)"
      class="popup-share">
    <template #header>
      <div class="header-button-container">
        <a href="javascript:;" class="btn-close" @click="onClose(false)">
          <img src="/images/icons/icon_close.png" alt="닫기"/>
        </a>
      </div>
      <p>이벤트 공유하기</p>
    </template>
    <template #body>
      <div class="share-container">
        <a href="javascript:void(0)" @click="shareSnsLink('kt', `https://skt-zem.co.kr?utm_source=opening&utm_medium=kashare&utm_campaign=opening`)">
          <img src="/images/icons/symbol_kakao.png" />
          <p>카카오톡</p>
        </a>
        <a href="javascript:void(0)" @click="shareSnsLink('fb', `https://skt-zem.co.kr?utm_source=opening&utm_medium=fbshare&utm_campaign=opening`)">
          <img src="/images/icons/symbol_facebook.png" />
          <p>페이스북</p>
        </a>
        <a href="javascript:void(0)" @click="shareSnsLink('tw', `https://skt-zem.co.kr?utm_source=opening&utm_medium=twshare&utm_campaign=opening`)">
          <img src="/images/icons/symbol_twitter.png" />
          <p>트위터</p>
        </a>
        <a href="javascript:void(0)"
           v-clipboard:copy="getLinkPath(LinkType.SHARE)"
           v-clipboard:success="onCopySuccess">
          <img src="/images/icons/symbol_share.png" />
          <p>링크 복사</p>
        </a>
      </div>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
:deep(.modal-container) {
  max-width: 660px;
}
:deep(.modal-header) {
  color: #373737;
  font-weight: normal;
  .header-button-container {
    padding-top: 4px;
    text-align: right;
    a {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-left: auto;
    }
    &+p {
      font-size: 32px;
    }
  }
}
:deep(.modal-body) {
  padding: 24px;
  a {
    color: #282828;
  }
}
:deep(.modal-footer) {
  * {
    display: none;
  }
}
.share-container {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;

  & > a {
    display: block;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    width: 100px;
    p {
      white-space: nowrap;
    }
    img {
      width: 100%;
      max-width: 100px;
      margin-bottom: 8px;
    }
  }
}


@media only screen and (max-width: $mobile-max-width) {
  :deep(.modal-container) {
    max-width: vw(660);
  }
  :deep(.modal-header) {
    .header-button-container {
      &+p {
        padding-top: 4vw;
        font-size: vw(45);
      }
    }
  }
  :deep(.modal-body) {
    padding: vw(24);
  }
  :deep(.modal-footer) {
    font-size: 18px;
  }
  .share-container {
    gap: vw(40);
    flex-wrap: wrap;
    &>a {
      width: vw(100);
      font-size: vw(24);
    }
  }
}
</style>