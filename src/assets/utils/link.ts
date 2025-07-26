import {LinkType} from "@/assets/enums/linkType";
import {isInApp} from "@/assets/utils/popup";
import {isMobile} from "@/assets/utils/index";

/**
 * 링크 모음
 * @param type
 */
export function getLinkPath(type: LinkType) {
  switch (type) {
    case LinkType.EVENT1:
      return isInApp() ? 'https://bit.ly/zem-main-2' :
          isMobile() ? 'https://bit.ly/zem-main-2' :
              'https://bit.ly/zem-main-2';
    case LinkType.EVENT2:
      return isInApp() ? 'https://bit.ly/zem-main-3' :
          isMobile() ? 'https://bit.ly/zem-main-3' :
              'https://bit.ly/zem-main-3';
    case LinkType.EVENT3:
      return isInApp() ? 'https://bit.ly/zem-main-4' :
          isMobile() ? 'https://bit.ly/zem-main-4' :
              'https://bit.ly/zem-main-4';
    case LinkType.EVENT4:
      return isInApp() ? 'https://bit.ly/zem-main-5' :
          isMobile() ? 'https://bit.ly/zem-main-5' :
              'https://bit.ly/zem-main-5';
    case LinkType.EVENT5:
      return isInApp() ? 'https://m.tworld.co.kr/product/callplan?prod_id=NA00007493' :
          isMobile() ? 'https://m.tworld.co.kr/product/callplan?prod_id=NA00007493' :
              'https://www.tworld.co.kr/web/product/callplan/NA00007493';
    case LinkType.EVENT6:
      return isInApp() ? 'https://bit.ly/3Z50DO6' :
          isMobile() ? 'https://bit.ly/3Z50DO6' :
              'https://bit.ly/zem-main-6';
    case LinkType.INSTALL:
      return isInApp() ? 'https://bit.ly/3bcCAQP' :
          isMobile() ? 'https://bit.ly/3bcCAQP' :
              'https://bit.ly/3bcCAQP';

    case LinkType.SHARE:
      return isInApp() ? 'https://bit.ly/zem-main-share' :
          isMobile() ? 'https://bit.ly/zem-main-share' :
              'https://bit.ly/zem-main-share';
  }
  return '#';
}