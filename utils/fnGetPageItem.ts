import type { PageType } from "~/types/PageType"

function fnGetPageItem(pageType: PageType) {
    return serviceMap.find(item => item.pageType == pageType)
}

export default fnGetPageItem