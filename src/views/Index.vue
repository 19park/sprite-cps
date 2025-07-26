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
  <div class="main">
    <Header />
    <component :is="eventComponent" />
    <EventShare />
  </div>

  <a :href="getLinkPath(LinkType.INSTALL)" target="_blank" @click="trackClickAddEvent" class="btn-float">
    <img src="/images/btn_float.png" alt="ZEM 설치하기" />
  </a>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: $mobile-max-width;
}
a.btn-float {
  position: fixed;
  bottom: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 20;

  img {
    width: 207px;
    height: 207px;
  }
}
@media only screen and (max-width: $mobile-max-width) {
  a.btn-float {
    bottom: vw(25);
    right: vw(25);

    img {
      width: vw(207);
      height: vw(207);
    }
  }
}

@media (prefers-color-scheme: dark) {
  .main {
    background: #fff !important;
    background-color: #fff !important;
  }
}
</style>