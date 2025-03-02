import type { PageType } from "../PageType";
import type { ThemeType } from "../ThemeType";

export interface serivceItem {
    pageIndex : number,
    mobileIndex : number,
    desktopIndex : number,
    pageType : PageType,
    label: string,
    url: string,
    desktop: ThemeType,
    tablet: ThemeType,
    mobile: ThemeType,
    mobileVisible: boolean,
    homeButtonTheme: ThemeType,
    
}