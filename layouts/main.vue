<template>
    <div class="app">
        <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }">
            <transition name="header-effects">
                <div :class="{ 'header': true, 'mobile': deviceType == DeviceType.Mobile }">
                    <TheHeader :theme="theme" :deviceType="deviceType" :activedPage="activedPage" />
                </div>
            </transition>
        </div>
        <div class="content">
            <NuxtPage :deviceType="deviceType" @AnimationCompleted="animationCompleted" @AnimationStart="beginAnimation"
                :isHeaderLoaded="isHeaderLoaded"></NuxtPage>
        </div>
        <!-- 手機版的回到首頁 -->
        <button v-if="deviceType == DeviceType.Mobile"
            :class="{ 'home': true, 'dark': homeButtonTheme == ThemeType.Dark, 'light': homeButtonTheme == ThemeType.Light }"
            @click="() => $router.push('/')">HOME</button>
    </div>
</template>
<script setup lang="ts">
import TheHeader from '~/componenets/TheHeader.vue';
import { DeviceType } from '@/types/DeviceType';
import { PageType } from '@/types/PageType';
import { ThemeType } from '@/types/ThemeType';
const route = useRoute();
const homeButtonType = ref<ThemeType>(ThemeType.Default);
const isAnimationCompleted = ref(false);
const isHeaderVisible = ref(false);
const isAnimationPlaying = ref(false);
const isHeaderLoaded = ref(false);

function beginAnimation() {
    isAnimationCompleted.value = false;
    isHeaderVisible.value = true;
    isAnimationPlaying.value = true;
}

function animationCompleted() {
    isAnimationCompleted.value = true;
    isAnimationPlaying.value = false;
}

const clientWidth = ref(0);
const activedPage = computed(() => {
    return serviceMap.find(service => service.url == route.path)?.pageType ?? PageType.Default
});
const theme = computed(() => {
    return deviceType.value == DeviceType.Mobile ? serviceMap.find(service => service.url == route.path)?.mobile ?? ThemeType.Default
        : serviceMap.find(service => service.url == route.path)?.desktop ?? ThemeType.Default
});
const deviceType = computed(() => {
    return clientWidth.value <= 768 ? DeviceType.Mobile : DeviceType.Desktop
});
const homeButtonTheme = computed(() => {
    return serviceMap.find(service => service.url == route.path)?.homeButtonTheme ?? ThemeType.Default
});
function updateWindowClientWidth() {
    clientWidth.value = Math.min(window.innerWidth, window.outerWidth)
}

onMounted(() => {
    updateWindowClientWidth();
    window.addEventListener('resize', updateWindowClientWidth);
    window.addEventListener('scroll', updateWindowClientWidth);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateWindowClientWidth);
    window.removeEventListener('scroll', updateWindowClientWidth);
});


useHead({
    title: '雙向數位創意 | CROXINC Studio - 客製化系統、數據分析',
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap' }
    ],
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'title', content: '雙向數位創意 | CROXINC Studio - 客製化系統、流程自動化專家' },
        { name: 'description', content: '為您提供量身打造的作業流程、諮詢服務、各類客製化系統，或是RPA軟體流程自動化。' },
        { name: 'keywords', content: '客製化系統, 流程自動化, RPA, 軟體開發, 萊數位, Croxinc Studio' },
        { property: 'og:title', content: '雙向數位創意 | CROXINC Studio - 客製化系統、流程自動化專家' },
        { property: 'og:url', content: 'https://www.croxinc.com' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: '雙向數位創意 | CROXINC Studio' },
        { property: 'og:description', content: '為您提供量身打造的作業流程、諮詢服務、各類客製化系統，或是RPA軟體流程自動化。' },
        { property: 'og:image', content: 'https://www.croxinc.com/images/croxinc.png' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '294' },
        { property: 'og:image:height', content: '263' },
        { name: 'image', content: 'https://www.croxinc.com/images/croxinc.png' }
    ]
});
</script>
<style scoped>
.app {
    font-family: 'Noto Sans TC", sans-serif';
}

.container {
    max-width: 1366px;
    margin: 0 auto;
}

.header {
    z-index: 99;
    padding: 72px 0px;

    &.mobile {
        padding: 36px 5px;
    }
}

/* 20240824 加入手機排版 */
.home {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    letter-spacing: 1.5px;
    font-size: 14px;
    border-radius: 50%;
    background-color: transparent;
    color: white;
    z-index: 100;
    /* 文字置中 */
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;

    &.dark {
        border: 2px solid white;
        color: white;
    }

    &.light {
        border: 2px solid black;
        color: black;
    }
}

.homeLink {
    color: black;

    &.dark {
        color: white;
    }

    &.light {
        color: black;
    }
}





/*     header-effects start     */
.header-effects-enter-active,
.header-effects-leave-active {
    transition: all 1.0s ease-in-out;
}

.header-effects-enter-from,
.header-effects-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

.header-effects-enter-to,
.header-effects-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     header-effects end     */
</style>