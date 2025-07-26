export function isInApp() {
    return navigator.userAgent.indexOf('TWM_APP') !== -1;
}

/**
 *
 * @param title
 * @param uri
 * @param type 0 인앱내 새 웹뷰, 1 웹브라우져
 */
export function openInAppPopup(title:String, uri:string, type:number = 0) {
    //userAgent에 TWM_APP외 정보를 전달받지 못하여 따로따로 요청

    try {
        (window as any).webkit.messageHandlers.tworld.postMessage({
            command: "openUrl",
            params: {
                type: type,
                href: uri,
                title: title
            },
        });
    } catch {
    }
    try {
        (window as any).tworld.postMessage(JSON.stringify({
            command: "openUrl",
            params: {
                type: type,
                href: uri,
                title: title
            },
        }));
    } catch {

    }
}
/**
 * 안드로이드에서 앱내 이동시 이동한 페이지에서 새로운 팝업을 띄우는데 이슈가 있어서,
 * 임시로 작업함.
 * @param event
 */
export function openNewWindow(event: Event) {
    if(isInApp()
        && event.currentTarget
        && (event.currentTarget as any).tagName == 'A'
        && (event.currentTarget as any).href
        && (event.currentTarget as any).href != '#'
    ) {
        event.preventDefault();
        const href = (event.currentTarget as any).href;
        openInAppPopup("", href, 1);
    } else {
    }
}