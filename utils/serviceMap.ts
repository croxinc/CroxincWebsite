import type { serivceItem } from "~/types/dtos/ServiceItem";
import { PageType } from "~/types/PageType";
import { ThemeType } from "~/types/ThemeType";


const serviceItems: serivceItem[] = [
    { pageIndex: 0, mobileIndex: -1, desktopIndex: 0, pageType: PageType.Home, label: 'HOME', url: '/', desktop: ThemeType.Dark, tablet: ThemeType.Dark, mobile: ThemeType.Dark, mobileVisible: false, homeButtonTheme: ThemeType.Dark },
    { pageIndex: 1, mobileIndex: 0, desktopIndex: 1, pageType: PageType.About, label: '關於我們', url: '/about', desktop: ThemeType.Light, tablet: ThemeType.Light, mobile: ThemeType.Dark, mobileVisible: true, homeButtonTheme: ThemeType.Light },
    { pageIndex: 2, mobileIndex: 1, desktopIndex: 2, pageType: PageType.Service, label: '服務項目', url: '/service', desktop: ThemeType.Light, tablet: ThemeType.Light, mobile: ThemeType.Light, mobileVisible: true, homeButtonTheme: ThemeType.Light },
    { pageIndex: 3, mobileIndex: 2, desktopIndex: 3, pageType: PageType.Process, label: '合作流程', url: '/process', desktop: ThemeType.Light, tablet: ThemeType.Light, mobile: ThemeType.Light, mobileVisible: true, homeButtonTheme: ThemeType.Light },
    { pageIndex: 4, mobileIndex: 3, desktopIndex: 4, pageType: PageType.Project, label: '案例分享', url: '/project', desktop: ThemeType.Light, tablet: ThemeType.Light, mobile: ThemeType.Light, mobileVisible: true, homeButtonTheme: ThemeType.Light },
    { pageIndex: 5, mobileIndex: 4, desktopIndex: 5, pageType: PageType.Contact, label: '聯絡我們', url: '/contact', desktop: ThemeType.Light, tablet: ThemeType.Light, mobile: ThemeType.Light, mobileVisible: true, homeButtonTheme: ThemeType.Light },
]
export default serviceItems