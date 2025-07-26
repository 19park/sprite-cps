<script setup lang="ts">
import {EventType} from "@/assets/enums/eventType";
import Alert from "@/assets/utils/alert";
import {getLinkPath} from "@/assets/utils/link";
import {LinkType} from "@/assets/enums/linkType";
import {trackClickShare} from "@/assets/utils/track";

const EVENT_URL = getLinkPath(LinkType.SHARE);
const EVENT_IMAGE = "https://skt-zem.co.kr/images/ogtag.kakao.png";
const SHARE_TITLE = "SPRITE CPS TEST";
const SHARE_DESC = "SPRITE CPS TEST DESCRIPTION";

/**
 * sns 공유
 * @param type
 */
function shareSnsLink(type: EventType) {
  switch (type) {
    case EventType.URL:
      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.value = EVENT_URL;
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("링크가 복사되었습니다. 필요하신 곳에 붙여넣기 하세요!")
      break;
    case EventType.NAVER:
      trackClickShare("btn_naver");
      window.open('https://share.naver.com/web/shareView.nhn?url='+ EVENT_URL + "&title=" + SHARE_TITLE,
          "naver", "height=600,width=550,resizable=1");
      break;
    case EventType.FACEBOOK:
      trackClickShare("btn_fb");
      window.open('http://www.facebook.com/sharer.php?u='+ EVENT_URL,
          "facebook", "height=300,width=550,resizable=1");
      break;
    case EventType.TWITTER:
      trackClickShare("btn_twitter");
      window.open("http://twitter.com/share?url=" +
          encodeURIComponent(EVENT_URL) + "&text=" +
          encodeURIComponent(SHARE_TITLE) + "&count=none/",
          "tweet", "height=300,width=550,resizable=1");
      break;
    case EventType.KAKAO:
      if (!window.Kakao) return alert("카카오 공유를 지원하지 않습니다.");

      trackClickShare("btn_kakao");
      window.Kakao.Share.sendCustom({
        templateId: 112357,
        templateArgs: {
          title: SHARE_TITLE,
          description: SHARE_DESC,
        },
      });
      // window.Kakao.Share.sendDefault({
      //   objectType: 'feed',
      //   content: {
      //     title: SHARE_TITLE,
      //     description: SHARE_DESC,
      //     imageUrl: EVENT_IMAGE,
      //     link: {
      //       mobileWebUrl: EVENT_URL,
      //       webUrl: EVENT_URL,
      //     },
      //   },
      //   buttons: [
      //     {
      //       title: '자세히 보기',
      //       link: {
      //         mobileWebUrl: EVENT_URL,
      //         webUrl: EVENT_URL,
      //       },
      //     },
      //   ],
      // })
      break;
  }
}

function onCopySuccess() {
  Alert.success("복사가 완료되었습니다. 링크를 공유해주세요.")
}
</script>

<template>
  <section class="share">
    <div class="share-container">
      <img src="/images/event-share/content.png" alt="새로워진 ZEM 하나로 모두 다- 안심 ZEM 혜택 모음 공유하기"/>

      <div class="share-btn-container">
        <a href="javascript:;" class="btn-kakao" @click="shareSnsLink(EventType.KAKAO)">
          <img src="/images/event-share/symbol_kakao.png" alt="카카오톡 공유"/>
        </a>
        <a href="javascript:;" class="btn-naver" @click="shareSnsLink(EventType.NAVER)">
          <img src="/images/event-share/symbol_naver.png" alt="네이버 공유"/>
        </a>
<!--        <a href="javascript:;" class="btn-facebook" @click="shareSnsLink(EventType.FACEBOOK)">-->
<!--          <img src="/images/event-share/symbol_facebook.png" alt="페이스북 공유"/>-->
<!--        </a>-->
<!--        <a href="javascript:;" class="btn-twitter" @click="shareSnsLink(EventType.TWITTER)">-->
<!--          <img src="/images/event-share/symbol_twitter.png" alt="트위터 공유"/>-->
<!--        </a>-->
        <a href="javascript:;"
           class="btn-url"
           @click="trackClickShare('btn_url')"
           v-clipboard:copy="EVENT_URL"
           v-clipboard:success="onCopySuccess">
          <img src="/images/event-share/symbol_URL.png" alt="URL 공유"/>
        </a>
      </div>
    </div>
  </section>
  <!-- <div class="float-padding"></div> -->
</template>

<style lang="scss" scoped>
.float-padding {
  padding-bottom: 210px;
  background-color: #333333;
}
.share {
  position: relative;
  .btn-more {
    position: absolute;
    top: 70px;
    left: 80px;
    width: 680px;
    height: 130px;
  }
  .share-container {
    .share-btn-container {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 665px;
      left: 88px;
      bottom: 67px;
      gap: 29px;

      a {
        width: 110px;
      }
    }
  }
}

@media only screen and (max-width: $mobile-max-width) {
  .float-padding {
    padding-bottom: vw(210);
  }
  .share {
    .btn-more {
      top: vw(70);
      left: vw(80);
      width: vw(680);
      height: vw(130);
    }
    .share-container {
      .share-btn-container {
        width: vw(665);
        left: vw(88);
        bottom: vw(67);
        gap: vw(29);

        a {
          width: vw(110);
        }
      }
    }
  }
}
</style>