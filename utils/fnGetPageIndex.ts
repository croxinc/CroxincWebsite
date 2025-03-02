import { DeviceType } from "~/types/DeviceType";
import type { PageType } from "~/types/PageType";

function fnGetPageIndex(deviceType: DeviceType, pageType: PageType | undefined) {    
    if (!pageType) return -1;
    let item = serviceMap.find(item => item.pageType == pageType)
    if (item) {
        switch (deviceType) {
            case DeviceType.Desktop:
                return item.desktopIndex
            case DeviceType.Mobile:
                return item.mobileIndex
            default:
                return item.desktopIndex
        }
    }
    return -1;
}

export default fnGetPageIndex;