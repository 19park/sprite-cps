<script setup lang="ts">
import { reactive } from 'vue'
import { Collapse } from 'vue-collapsed';

const questions = reactive([
  {
    // 이벤트 유의사항
    isExpanded: false
  },
  {
    // 경품관련 유의사항
    isExpanded: false
  },
  {
    // 문의: 이벤트 운영사무국
    isExpanded: false
  },
]);

function handleAccordion(selectedIndex:number) {
  questions.forEach((_, index) => {
    questions[index].isExpanded = index === selectedIndex ? !questions[index].isExpanded : false
  });
}
</script>

<template>
  <section class="notice">
<!--    <div class="notice-container">-->
<!--      <div class="notice__header active">-->
<!--        <span><img src="/images/icons/icon_event_info.png" alt=""/></span>-->
<!--        <h3>이벤트 유의 사항</h3>-->
<!--      </div>-->
<!--    </div>-->
    <div class="notice-container">
      <a href="javascript:;"
         class="notice__header notice__header-btn"
         :class="{active: questions[0].isExpanded}"
         @click="handleAccordion(0)">
        <span>
          <img v-if="questions[0].isExpanded" src="/images/icons/icon_arrow.on.png" alt=""/>
          <img v-else src="/images/icons/icon_arrow.png" alt=""/>
        </span>
        <h3>이벤트 유의 사항</h3>
      </a>
      <Collapse :when="questions[0].isExpanded">
        <div class="notice__body">
          <p>• 이 이벤트 경품은 2024년 7월 10일(수)부터 7월 18일(목)까지 SK텔레콤 갤럭시 폴더블6 혜택 알림 수신에 동의한 만 14세 이상 고객님만 받으실 수 있습니다. (법인 및 외국인 고객님은 이벤트에 참여하실 수 없습니다.)​</p>
          <p>• 100% 당첨 스마일캐시 1,500원은 이벤트 참여 시 광고 및 마케팅 수신에 동의 후 입력한 휴대폰 번호로 10분 안에 보내 드립니다.</p>
          <p>• 당첨된 랜덤 스마일캐시는 이벤트 기간 안에 SK텔레콤 공식 인증 대리점 또는 T 다이렉트샵에서 갤럭시 폴더블6 사전예약을 완료하신 고객님께 2024년 7월 26일(금) 장문문자(LMS)로 보내 드립니다.</p>
          <p>• 이 이벤트는 본인 명의의 휴대폰 번호당 1회 참여하실 수 있습니다.(중복으로 참여하실 수 없습니다.)</p>
          <p>• SK텔레콤에서 진행하는 다른 이벤트와 중복으로 참여하실 수 있습니다.</p>
          <p>• 비정상적이거나 불법적인 방법으로 이벤트에 참여하신 경우 당첨 및 혜택 제공 대상에 포함되지 않으며, 당첨이 되더라도 취소될 수 있습니다.</p>
          <p>• 개인정보를 잘못 입력해 경품을 받지 못하실 경우 SK텔레콤에서 책임지지 않습니다.</p>
          <p>• 이벤트 참여 시 입력하신 휴대폰 번호는 이벤트 종료 후 2달 안에 파기됩니다.</p>
          <p>• 이 이벤트는 SK텔레콤 및 제휴사 사정에 따라 일찍 종료될 수 있습니다.</p>
          <p>• 경품 종류, 개수 등은 SK텔레콤 또는 경품 공급사 사정에 따라 변경될 수 있습니다.</p>
          <p>• 이 이벤트는 SK텔레콤의 위탁을 받아 대행사 본애드컴(주)에서 운영 및 경품 발송을 진행합니다.</p>

          <br>
        </div>
      </Collapse>
    </div>
    <div class="notice-container">
      <a href="javascript:;"
         class="notice__header notice__header-btn"
         :class="{active: questions[1].isExpanded}"
         @click="handleAccordion(1)">
        <span>
          <img v-if="questions[1].isExpanded" src="/images/icons/icon_arrow.on.png" alt=""/>
          <img v-else src="/images/icons/icon_arrow.png" alt=""/>
        </span>
        <h3>경품 관련 유의 사항</h3>
      </a>
      <Collapse :when="questions[1].isExpanded">
        <div class="notice__body">
          <h4>[공통]</h4>
          <p>• 이 이벤트 혜택은 "100% 당첨 스마일캐시 1,500원"과 "랜덤 스마일캐시"로 나뉩니다.</p>
          <p>• 100% 당첨 스마일캐시 1,500원 (선착순 6만 명)</p>
          <p>• 랜덤 스마일캐시 최대 10만 원 (선착순 6만 명)</p>
          <p>• 경품 이미지는 예시로 실제와 다를 수 있습니다.</p>
          <p>• 본 경품은 프로모션 상품으로 유효기간 연장 및 환불이 불가합니다. </p>
          <p>• 5만 원이 초과하는 경품에 대한 제세공과금(22%)은 SK텔레콤에서 부담합니다.</p>
          <p>• 세금 대납 및 경품 인도 등 절차상 필요한 서류(신분증 사본 등)를 요청할 수 있으며, 이를 거부하시면 경품을 받으실 수 없습니다.</p>
          <p>• 만 14세 이상 만 19세 미만 고객님이 당첨될 경우 법정 대리인 동의 및 관련 절차가 요구될 수 있습니다. (만 19세 미만 고객님에 한해 법정 대리인에게 당첨권을 양도하실 수 있습니다.) </p>
          <br><br>

          <h4>[스마일캐시 쿠폰 등록 방법]</h4>
          <p>[모바일 웹/앱] G마켓 접속 > MyG > 내 쿠폰 > 스크롤 내리기 > 최하단 ‘이벤트 인증번호 입력’ 메뉴 > 쿠폰번호 입력 후 스마일캐시 발급받기</p>
          <p>[PC] G마켓 접속 > 나의 G마켓 > 쿠폰/이벤트 > 이벤트 탭 > ‘이벤트 인증번호 등록하기’ 메뉴 > 쿠폰번호 입력 후 스마일캐시 발급받기</p>
          <p>[G마켓 바로가기 URL]: <a href="https://eventnet.gmarket.co.kr/MyEvent/MyEventHome2" target="_blank">https://eventnet.gmarket.co.kr/MyEvent/MyEventHome2</a></p>

          <br><br>

          <h4>[100% 당첨 스마일캐시 1,500원]</h4>
          <p>• 광고 및 마케팅 수신에 동의하지 않으시면 "100% 당첨 스마일캐시 1,500원" 증정 대상에 포함되지 않습니다.</p>
          <p>• 당첨되신 스마일캐시 1,500원은 이벤트 참여시 입력하신 휴대폰 번호 문자(MMS)로 10분 안에 보내드리며, 이벤트 참여 완료 후에는 번호를 수정하실 수 없습니다.</p>
          <p>• 재발송을 원하시는 고객님은 2024년 7월 18일(목)까지 이벤트 운영 사무국으로 문의 부탁드리며, 이후 요청 시 당첨이 취소됩니다.</p>
          <p>• 쿠폰은 2024년 8월 10일(토)까지 등록 가능하며, 유효 기간이 지나면 등록하실 수 없습니다.</p>
          <p>• 발급된 스마일캐시의 유효기간은 2024년 9월 10일(화)까지이며, 기간 내 미사용 시 스마일캐시는 자동 소멸됩니다.</p>
          <p>• 해당 쿠폰은 프로모션 경품으로, 환불하거나 유효 기간을 연장할 수 없습니다.</p>
          <p>• 해당 쿠폰은 특별히 선정된 고객님께만 드리는 혜택으로 양도/판매/재발급은 불가합니다.</p>
          <p>• 스마일캐시는 G마켓, 옥션 외 신세계 계열사 및 다양한 스마일페이 제휴가맹점에서 사용이 가능합니다.</p>
          <p>• 자세한 스마일캐시 사용처 및 사용 문의는 G마켓 고객센터(1566-5701)로 연락주세요.</p>
          <p>• 발급된 스마일캐시는 마이페이지 (옥션/G마켓/스마일페이) >Smile Cash 내역에서 확인이 가능합니다.</p>
          <p>• 스마일캐시 유효기간 만료 후 교환/환불로 인한 재결제 시에는 재적용이 불가합니다.</p>

          <br><br>

          <h4>[랜덤 스마일캐시]</h4>
          <p>• "랜덤 스마일캐시"는 이벤트 기간 안에 SK텔레콤 공식인증대리점 또는 T 다이렉트샵에서 갤럭시 폴더블6를 사전예약을 완료하신 고객님께 2024년 7월 26일(금)에 일괄 발송됩니다.</p>
          <p>• 이벤트 참여시 입력하신 휴대폰 번호 장문문자(LMS)로 보내드리며, 이벤트 참여 완료 후에는 번호를 수정하실 수 없습니다.</p>
          <p>• 재발송을 원하시는 고객님은 2024년 8월 19일(월)까지 이벤트 운영 사무국으로 문의 부탁드리며, 이후 요청 시 당첨이 취소됩니다.</p>
          <p>• 쿠폰은 2024년 8월 19일(월)까지 등록 가능하며, 유효 기간이 지나면 등록하실 수 없습니다.</p>
          <p>• 발급된 스마일캐시의 유효기간은 2024년 9월 19일(목)까지이며, 기간 내 미사용 시 스마일캐시는 자동 소멸됩니다.</p>
          <p>• 해당 쿠폰은 프로모션 경품으로, 환불하거나 유효 기간을 연장할 수 없습니다.</p>
          <p>• 해당 쿠폰은 특별히 선정된 고객님께만 드리는 혜택으로 양도/판매/재발급은 불가합니다.</p>
          <p>• 스마일캐시는 G마켓, 옥션 외 신세계 계열사 및 다양한 스마일페이 제휴가맹점에서 사용이 가능합니다.</p>
          <p>• 자세한 스마일캐시 사용처 및 사용 문의는 G마켓 고객센터(1566-5701)로 연락주세요.</p>
          <p>• 발급된 스마일캐시는 마이페이지 (옥션/G마켓/스마일페이) >Smile Cash 내역에서 확인이 가능합니다.</p>
          <p>• 스마일캐시 유효기간 만료 후 교환/환불로 인한 재결제 시에는 재적용이 불가합니다.</p>

          <br>
        </div>
      </Collapse>
    </div>
    <div class="notice-container">
      <a href="javascript:;"
         class="notice__header notice__header-btn"
         :class="{active: questions[2].isExpanded}"
         @click="handleAccordion(2)">
        <span>
          <img v-if="questions[2].isExpanded" src="/images/icons/icon_arrow.on.png" alt=""/>
          <img v-else src="/images/icons/icon_arrow.png" alt=""/>
        </span>
        <h3>문의: 이벤트 운영사무국</h3>
      </a>
      <Collapse :when="questions[2].isExpanded">
        <div class="notice__body">
          <p>• 이 이벤트와 관련된 문의사항은 아래 이벤트 운영 고객센터로 문의 바랍니다.</p>
          <p class="no-mark link">- 이메일: <a href="mailto:skt.foldable6@gmail.com">skt.foldable6@gmail.com</a></p>
          <p class="no-mark link">- 카카오채널: SKT 폴더블6 육대급 프로모션 (<a href="http://pf.kakao.com/_xgTxlpG/chat" target="_blank">http://pf.kakao.com/_xgTxlpG/chat</a>)</p>
          <p class="no-mark link">- 전화: <a href="tel:1600-3408">1600-3408</a> (평일 오전 10시~오후 5시, 점심시간 낮 12시~오후 1시, 주말/공휴일 휴무, 유료)</p>
          <br>
        </div>
      </Collapse>
    </div>

  </section>
</template>

<style lang="scss" scoped>
.notice {
  background-color: #2C2C2C;

  .notice-container {
    .notice__header {
      display: flex;
      align-items: center;
      color: #CFCFCF;
      column-gap: 22px;
      padding: 50px 40px;
      border-bottom: 1px solid #707070;

      //&.active {
      //  color: #ffffff;
      //}

      span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        img {
          width: 32px;
        }
      }
      h3 {
        font-size: 32px;
        font-weight: $font-weight-bold;
      }

      &.notice__header-btn {
        column-gap: 22px;
      }
    }
    .notice__body {
      background-color: #EEEEEE;
      color: #191919;
      padding: 47px;
      font-weight: $font-weight-medium;

      h3, h4 {
        font-size: 30px;
        margin-bottom: 20px;
        font-weight: $font-weight-medium;
      }
      p {
        font-size: 26px;
        line-height: 36px;
      }
    }

    &:last-child {
      .notice__header {
        border-bottom: none;
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  .notice {
    .notice-container {
      .notice__header {
        column-gap: vw(10);
        padding: vw(50 40);

        span img {
          width: vw(36);
        }
        h3 {
          font-size: vw(32);
        }

        &.notice__header-btn {
          column-gap: vw(22);
        }
      }
      .notice__body {
        padding: vw(47);

        h3, h4 {
          font-size: vw(30);
          margin-bottom: vw(20);
        }
        p {
          font-size: vw(26);
          line-height: vw(36);
        }
      }
    }
  }
}
</style>