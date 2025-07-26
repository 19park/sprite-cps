import {UnwrapRef} from "vue";
import {isInApp, openInAppPopup} from "@/assets/utils/popup";

function getMask(value: UnwrapRef<string>) {
    if (!value) return value;

    let maskedValue = value;
    maskedValue = value
        .replace(/[^0-9]/g, '')
    if(maskedValue.length <= 8) {
        maskedValue = maskedValue.replace(/^(\d{4})(\d{4})$/, `$1-$2`);
    }
    else if(maskedValue.length > 8) {
        maskedValue = maskedValue.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }
    return maskedValue;
}

// 전화번호 마스킹
export function phoneNumberMask(value?: UnwrapRef<string>): string {
    return getMask(value ?? "");
}

// 휴대번호 형식 검증
export function validatePhoneNumber(value?: string) {
    const str = value ?? "";
    const regex = /01[016789]-[^0][0-9]{3,4}-[0-9]{4}/;
    return regex.test(str);
}

// 셔플 어레이
export function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
}

// 지연
export function delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/**
 * # a 태그를 이용하여 파일 다운로드
 * @param filefullname 파일 이름
 * @param url 다운로드 URL
 */
export function aLinkDownload(filefullname: string, url: string) {
    if(isInApp()) {
        openInAppPopup("이미지 다운로드",url,1);
    } else {
        let a = document.createElement('a');
        a.href = url;
        a.download = filefullname;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}

export function getBaseUrl() {
    const href = window.location.href
    const hashPos = href.indexOf('#')
    let base = hashPos > -1 ? href.slice(0, hashPos) : href

    const searchPos = base.indexOf('?')
    const query = searchPos > -1 ? base.slice(searchPos) : ''
    base = query ? base.slice(0, searchPos) : base

    // return `${base}#${path + query}`
    return `${base}`;
}

export function getAssetUrl(pathname: string) {
    //절대 주소이면 그대로 리턴
    if(/^http(s)?:\/\//.test(pathname)) return pathname;
    let origin = location.origin;
    let basePath = (location.hostname == 'localhost')? "/": location.pathname;
    let path = (basePath + pathname).replace(/\/+/g,"/");
    return origin + path;
}

/**
 * # 이미지 저장 클릭
 */
export function onClickDownload(url: string) {
    const displayName = "당첨_이미지"
    let urlTimeStamp = url.startsWith('http') ? `?${new Date().getTime()}` : ``;
    url = url + urlTimeStamp;
    let userAgent = window.navigator.userAgent;
    if (/Trident|MSIE/.test(userAgent)) {
        // for internet explorer
        let downloadWindow: any = window.open(url, "_blank");
        downloadWindow.document.close();
        downloadWindow.document.execCommand('SaveAs', true, displayName);
        downloadWindow.close();
        return true;
    } else {
        // for the other browers like chrome, safari, ff, ...
        // xhr blob 다운로드 이용
        if (url.startsWith('http://') || url.startsWith('https://')) {
            // http 로 시작하는 static 파일 URL 의 경우
            // 데이터를 가져와서 blob으로 만들어서 다운로드
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = async function () {
                    const href = window.URL.createObjectURL(xhr.response); // xhr.response 를 blob으로 가져옴
                    aLinkDownload(`${displayName}.png`, href);
                    window.URL.revokeObjectURL(href);
                    return resolve(true);
                };
                xhr.onerror = async function () {
                    return reject(false);
                }
                xhr.open('GET', `${url}`);
                xhr.send();
            });
        }
    }
}

export function debounce(func: () => void, timeout = 300) {
    let timer: any;
    const self = this;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(self, args);
        }, timeout);
    };
}

/**
 * 이미지 base64 변환
 * @param url
 * @param callback
 */
export function imageTo64(
    url: string,
    callback: (path64: any) => void
): void {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();

    xhr.onload = (): void => {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = (): void => callback(reader.result);
    }
}

/**
 * sns 공유
 * @param type
 * @param url
 */
export function shareSnsLink(type: "fb" | "tw" | "kt", url: string) {
    const SHARE_TITLE = "SPRITE CPS TEST";
    const SHARE_DESC = "SPRITE CPS TEST DESCRIPTION";
    switch (type) {
        case "fb":
            window.open('http://www.facebook.com/sharer.php?u='+ url,
                "tweet", "height=300,width=550,resizable=1");
            break;
        case "tw":
            window.open("http://twitter.com/share?url=" +
                encodeURIComponent(url) + "&text=" +
                encodeURIComponent(SHARE_TITLE) + "&count=none/",
                "tweet", "height=300,width=550,resizable=1");
            break;
        case "kt":
            if (!window.Kakao) return alert("카카오 공유를 지원하지 않습니다.");
            window.Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: SHARE_TITLE,
                    description: SHARE_DESC,
                    imageUrl:
                        'https://skt-zem.co.kr/images/ogtag.kakao.png',
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: url,
                            webUrl: url,
                        },
                    },
                    // {
                    //     title: '앱으로 보기',
                    //     link: {
                    //         mobileWebUrl: url,
                    //         webUrl: url,
                    //     },
                    // },
                ],
            })
            break;
    }
}

export function isMobile() {
    const UserAgent = navigator.userAgent;
    return UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null;
}

/**
 * URL의 쿼리 문자열에서 특정 파라미터의 값을 가져옵니다.
 * @param paramName 가져올 파라미터의 이름
 * @param url (선택적) 파싱할 URL. 제공되지 않으면 현재 페이지의 URL을 사용합니다.
 * @returns 파라미터 값 또는 파라미터가 없는 경우 null
 */
export function getQueryParam(paramName: string, url?: string): string | null {
    // url이 제공되지 않았다면 현재 페이지의 URL을 사용
    const queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(paramName);
}