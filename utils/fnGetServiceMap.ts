import { DeviceType } from "~/types/DeviceType";
function fnGetServiceMap(deviceType: DeviceType = DeviceType.Desktop) {
    switch (deviceType) {
        case DeviceType.Desktop:
            return serviceMap;
        // case DeviceType.Tablet:
        //     return serviceMap;
        case DeviceType.Mobile:
            return serviceMap.filter(item => item.mobileVisible);
        default:
            return serviceMap
    }
}

export default fnGetServiceMap