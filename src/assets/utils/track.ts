import {openNewWindow} from "@/assets/utils/popup";

export const KAKAO_PIXEL_TRACK_ID = '5543852327694154968';
export const deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";

/**
 * 버튼 공통 트레킹
 */
export function trackClickEvent(e: Event) {
    try {
        openNewWindow(e);
    } catch(e) {
        console.log(e);
    }
}

/**
 * 버튼 메타, Tnk 트레킹
 */
export function trackClickAddEvent(e: Event) {
    try {
        openNewWindow(e);
        (window as any).fbq('track', 'Lead');
        (window as any).TnkSession.actionCompleted();
    } catch(e) {
        console.log(e);
    }
}

/**
 * 공유하기 클릭
 * @param eventName
 */
export function trackClickShare(eventName: 'btn_kakao' | 'btn_naver' | 'btn_fb' | 'btn_twitter' | 'btn_url') {
    try {
        (window as any).gtag('event', eventName, { value: 1 });
    } catch(e) {
        console.log(e);
    }
}

/**
 * 에이스트레이더 이벤트
 * @param name
 */
export function pushNeTGMQ(name:string) {
  try {
    const DEVICE = /iPad/.test(navigator.userAgent) ? "tablet" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "mobile" : "device";
    var d = new Date();
    var txNumber = d.getFullYear()+''+(d.getMonth() + 1)+''+d.getDate()+''+d.getHours()+''+d.getMinutes()+''+d.getSeconds()+''+d.getDay();
    (window as any).ne_tgm_q.push(
        {
          tagType: 'conversion',
          device:DEVICE,
          uniqValue:'',
          pageEncoding:document.inputEncoding,
          orderNo : txNumber/*주문번호입력*/,
          items : [{
            id: txNumber/*(필수)ID값입력*/,
            price:"1"/*(필수)가격정보입력*/,
            quantity:"1"/*(필수)갯수정보입력*/,
            category:""/*카테고리 대|중|소*/,
            imgUrl:""/*img링크값입력 ex)http://example.com/img/img.jpg*/,
            name:name/*(필수)제품명또는 전환메뉴명입력*/,
            desc:""/*상품상세 설명 text*/,
            link:""/*상품상세페이지 URL ex)http://example.com/detail/product.html*/
          }],
          totalPrice:"1"/*상품 총 금액 합산*/
        });

  } catch(e) {
    console.log(e);
  }
}

/**
 * 크리테오 이벤트 처리
 * @param eventName
 */
export function pushCriteo(eventName:String) {
  try {
    var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
    (window as any).criteo_q.push(
        { event: "setAccount", account: 104722},
        { event: "setEmail", email: "" },
        { event: "setZipcode", zipcode: "" },
        { event: "setSiteType", type: deviceType},
        {event:"trackTransaction", id:eventName, item: [
            {id: "1", price: 1, quantity: 1 }
          ]},
    );
  } catch(e) {
    console.log('criteo 오류');
    console.log(e);
  }
}

export function gtag_report_conversion(url?: string) {
    const callback = function () {
        if (typeof(url) != 'undefined') {
            (window as any).location = url;
        }
    };
    (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-880247897/0bS6CLybhroZENmI3qMD',
        'event_callback': callback
    });
    return false;
}