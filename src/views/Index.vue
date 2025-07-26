<script setup lang="ts">
import {computed} from 'vue';
import Header from "@/views/Header.vue";
import EventV2 from "@/views/EventV2.vue";
import EventV3 from "@/views/EventV3.vue";
import EventShare from "@/views/EventShare.vue";
import {getLinkPath} from "@/assets/utils/link";
import {LinkType} from "@/assets/enums/linkType";
import {trackClickAddEvent} from "@/assets/utils/track";
import {isEvent0920, isEvent0923} from "@/assets/utils/time";

const eventComponent = computed(() => {
  if (isEvent0920 && !isEvent0923) {
    return EventV2;
  } else if (isEvent0923) {
    return EventV3;
  } else {
    return EventV2;
  }
});
</script>

<template>
  <div class="main w-full max-w-mobile mx-auto">
    <Header />
    <component :is="eventComponent" />
    <EventShare />
  </div>

  <a :href="getLinkPath(LinkType.INSTALL)" target="_blank" @click="trackClickAddEvent" class="btn-float fixed bottom-6 right-6 z-20 flex flex-col items-end">
    <img src="/images/btn_float.png" alt="ZEM 설치하기" class="w-52 h-52" />
  </a>
</template>

<style lang="scss" scoped>
// 모바일 반응형 스타일 (vw 함수 사용)
@media only screen and (max-width: $mobile-max-width) {
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