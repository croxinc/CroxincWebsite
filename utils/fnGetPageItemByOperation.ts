import { OperatorType } from "~/types/OperatorType"
import type { PageType } from "~/types/PageType"
function fnGetPageItemByOperation(pageType: PageType, op: OperatorType) {
    var minIndex = serviceMap.map(item => item.pageIndex).reduce((a, b) => Math.min(a, b));
    var maxIndex = serviceMap.map(item => item.pageIndex).reduce((a, b) => Math.max(a, b));
    var pageIndex = serviceMap.find(item => item.pageType == pageType)?.pageIndex ?? 0;

    var index = pageIndex + op;
    if (index < minIndex) {
        index = maxIndex;
    }
    if (index > maxIndex) {
        index = minIndex;
    }
    return serviceMap.find(item => item.pageIndex == index)!;
}
export default fnGetPageItemByOperation 