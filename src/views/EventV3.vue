<script setup lang="ts">
import Layer from "@/components/atoms/Layer.vue";
import {trackClickEvent, trackClickAddEvent} from "@/assets/utils/track";
import { getLinkPath } from "@/assets/utils/link";
import { LinkType } from "@/assets/enums/linkType";
import {isEvent0920, isEvent0923, isEvent0930, isEvent1007, isEvent1014, isEventEnd} from "@/assets/utils/time";
</script>

<template>
  <section class="event">
    <div class="event__content">
      <div class="row">
        <div class="col order-1">
          <a :href="getLinkPath(LinkType.EVENT1)" target="_blank" @click="trackClickAddEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_01.png" alt="안심 기능 찾으면 푸짐한 경품이!"/>
          </a>
        </div>
        <div class="col">
          <a :href="getLinkPath(LinkType.EVENT2)" target="_blank" @click="trackClickAddEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <Layer v-else-if="isEvent1014"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_02.png" alt="iPhone 사용 중이라면? ZEM 설치하고 선물 받자!"/>
          </a>
        </div>
        <div class="col">
          <a :href="getLinkPath(LinkType.EVENT3)" target="_blank" @click="trackClickEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_03.png" alt="친구 초대할 때마다 네이버페이 포인트 적립"/>
          </a>
        </div>
        <div class="col">
          <a :href="getLinkPath(LinkType.EVENT4)" target="_blank" @click="trackClickEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_04.png" alt="ZEM 후기 작성하면 5만 원 상품권 증정"/>
          </a>
        </div>
        <div class="col">
          <a :href="getLinkPath(LinkType.EVENT5)" target="_blank" @click="trackClickEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_05.png" alt="ZEM 요금제면 데이터 1.5배 UP!"/>
          </a>
        </div>
        <div class="col">
          <a :href="getLinkPath(LinkType.EVENT6)" target="_blank" @click="trackClickEvent">
            <Layer v-if="isEventEnd"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <Layer v-else-if="isEvent0930"><img src="/images/event/closed.png" alt="closed" class="closed" /></Layer>
            <img src="/images/event/banner_06.png" alt="9월 테마파크 최대 50% 할인"/>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.event {
  position: relative;
  background-color: #FFFFFF;
  padding: 70px 30px;

  .event__content {
    .row {
      display: flex;
      flex-flow: column nowrap;
      gap: 30px;

      .col {
        position: relative;
        overflow: hidden;
        user-select: none;
        border-radius: 40px;

        img.coming-soon {
          &.date-0920,
          &.date-0923 {
            width: 382px;
          }
        }
        img.closed {
          width: 212px;
        }
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  .event {
    padding: vw(70 30);

    .event__content {
      .row {
        gap: vw(30);

        .col {
          border-radius: vw(40);

          img.coming-soon {
            &.date-0920,
            &.date-0923 {
              width: vw(382);
            }
          }
          img.closed {
            width: vw(212);
          }
        }
      }
    }
  }
}
</style>