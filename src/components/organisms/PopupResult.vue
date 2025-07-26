<script setup lang="ts">
import {computed, onMounted, ref, withDefaults} from "vue";
import Popup from "@/components/molecules/Popup.vue";
import {aLinkDownload, getAssetUrl, imageTo64} from "@/assets/utils";
import {DrawResultCode} from "@/assets/enums/drawResultCode";
import {trackClickEvent} from "@/assets/utils/track";

interface IPopupProps {
  modelValue: boolean;
  resultType: DrawResultCode;
  hasCouponCode?: boolean; // 스마일캐시 1,500원 당첨여부
}

const props = withDefaults(defineProps<IPopupProps>(), {
  hasCouponCode: false,
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

// 당첨결과 이미지 경로
const giftImgPath = computed(() => `/images/popup/draw/img_${props.resultType}.png`);

function onClose(update: boolean) {
  emits('update:modelValue', false);
  emits('close', update);
}

// 이미지 저장
function onClickDownloadImage() {
  let today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '-' + month  + '-' + day;
  aLinkDownload(dateString, getAssetUrl(giftImgPath.value));
}

const encodeImgPath = ref("");
onMounted(() => {
  console.log(giftImgPath.value)
  imageTo64(getAssetUrl(giftImgPath.value), (url: any) => {
    encodeImgPath.value = url;
  });
});
</script>

<template>
  <Popup
      v-model="proxy"
      @close="onClose(false)">
    <template #body>
      <div class="img_result">
        <template v-if="encodeImgPath">
          <img :src="encodeImgPath" alt="당첨 이미지"/>
        </template>
        <template v-else>
          <div class="loader-container">
            <div class="loader"></div>
          </div>
        </template>
      </div>

      <div v-if="props.hasCouponCode" class="cash-container">
        <img src="/images/popup/draw/img_draw_cash.png" alt="당첨된 스마일캐시 1,500원은 이벤트 참여 시 입력한 휴대폰 번호로 10분 안에 문자(MMS)로 보내 드립니다."/>
      </div>
      <div class="button-container">
        <a href="javascript:;" @click="trackClickEvent"><img src="/images/popup/draw/btn_reserve_store.png" alt="가까운 매장에서 사전예약하기"/></a>
        <a href="javascript:;" @click="trackClickEvent"><img src="/images/popup/draw/btn_reserve_shop.png" alt="T 다이렉트샵에서 사전예약하기"/></a>
      </div>
      <div class="noti-container">
        <img src="/images/popup/draw/img_noti.png" alt="당첨 안내 문구 이미지" />
      </div>
    </template>
    <template #footer>
      <div class="button-container">
        <a href="javascript:;" class="btn-down" @click="onClickDownloadImage"><img src="/images/popup/draw/btn_save.png" alt="이미지 저장"/></a>
        <a href="javascript:;" class="btn-close" @click="onClose(false)"><img src="/images/popup/draw/btn_close.png" alt="닫기"/></a>
      </div>
    </template>
  </Popup>
</template>

<style scoped lang="scss">
:deep(.modal-header) {
  display: none;
}
:deep(.modal-body) {
  padding: 50px 0 36px 0;
  -webkit-overflow-scrolling: touch;

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40vh;
  }
  .cash-container {
    margin-bottom: 34px;
    img {
      width: 654px;
    }
  }
  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    margin-bottom: 40px;
    a {
      width: 315px;
    }
  }
  .noti-container {
    text-align: center;
    img {
      width: 610px;
    }
  }
  .img_result {
    margin-bottom: 38px;
    img {
      width: 715px;
      height: 850px;
    }
  }
}
:deep(.modal-footer) {
  padding: 0;

  .button-container {
    display: flex;
    align-items: center;
    a {
      display: block;
      &.btn-down {
        width: 450px;
        background-color: #017EFF;
      }
      &.btn-close {
        width: 280px;
        background-color: #EDEDED;
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  :deep(.modal-body) {
    padding: vw(50 0 36 0);

    .cash-container {
      margin-bottom: vw(34);
      img {
        width: vw(654);
      }
    }
    .button-container {
      column-gap: vw(16);
      margin-bottom: vw(40);
      a {
        width: vw(315);
      }
    }
    .noti-container {
      img {
        width: vw(610);
      }
    }
    .img_result {
      margin-bottom: vw(38);
      img {
        width: vw(715);
        height: vw(850);
      }
    }
  }
  :deep(.modal-footer) {
    .button-container {
      a {
        &.btn-down {
          width: vw(450);
        }
        &.btn-close {
          width: vw(280);
        }
      }
    }
  }
}
</style>