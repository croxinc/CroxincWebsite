<template>
    <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }">
        <ul :class="{ 'services': true, 'mobile': deviceType == DeviceType.Mobile }"
            style="list-style: none;padding: 0;margin:0;">
            <li :class="{ 'serviceContainer': true, 'mobile': deviceType == DeviceType.Mobile }" :name="`item${index}`"
                v-for="(item, index) in fnGetServiceMap(deviceType)">
                <div :class="{ 'serviceItem': true, 'mobile': deviceType == DeviceType.Mobile }" ref="serviceItemRefs">
                    <NuxtLink :to="item.url" @click="fnSelectNext(item);" :class="{
                        'service': true, 'light': theme == ThemeType.Light, 'dark': theme == ThemeType.Dark, 'active': activedPage == item.pageType,
                    }">
                        <div :class="{ 'displayedText': true, 'mobile': deviceType == DeviceType.Mobile }">
                            {{ item.label }}
                        </div>
                    </NuxtLink>
                </div>
            </li>
        </ul>
        <div :style="fStyle"></div>
    </div>
</template>
<script setup lang="ts">

import { DeviceType } from '~/types/DeviceType';
import type { serivceItem } from '~/types/dtos/ServiceItem';

import { PageType } from '~/types/PageType';
import { ThemeType } from '~/types/ThemeType';

const theme = defineModel<ThemeType>('theme');
const deviceType = defineModel<DeviceType>('deviceType') as Ref<DeviceType>;
const lastPage = defineModel<PageType>('lastPage')
const activedPage = defineModel<PageType>('activedPage');
const serviceItemRefs = ref<Array<HTMLElement | null>>([]);
const nextItem = ref<HTMLElement | null>(null);
const isPlayAnimation = ref(false);
const updateTime = ref(0);

const fStyle = computed(() => {
    if (deviceType.value == DeviceType.Default || activedPage.value == PageType.Default) return '';
    if (deviceType.value == DeviceType.Mobile && activedPage.value == PageType.Home) return '';
    if (updateTime.value == 0) return '';
    nextItem.value = serviceItemRefs.value[fnGetPageIndex(deviceType.value, activedPage.value)];
    if (nextItem == null || nextItem.value == null) return '';
    if (nextItem.value.getBoundingClientRect().top <= 0) return '';
    const nextStyle = ref<string>('');
    const targetSize = nextItem.value.getBoundingClientRect();
    const targetWidth = deviceType.value == DeviceType.Mobile ? targetSize.width + 4.0 : targetSize.width + 4.0;
    const targetHeight = deviceType.value == DeviceType.Mobile ? targetSize.height + 3.0 : targetSize.height + 3.0;
    const targetY = deviceType.value == DeviceType.Mobile ? targetSize.top - 4.5 : targetSize.top - 4.0;
    const targetX = deviceType.value == DeviceType.Mobile ? targetSize.left - 4.0 : targetSize.left - 5.0;
    const borderW = deviceType.value == DeviceType.Mobile ? 1.0 : 2.0;
    nextStyle.value += "position: fixed;";
    nextStyle.value += "border-radius: 5px;";    
    nextStyle.value += `border: ${borderW}px solid #c9c9c9;`;
    nextStyle.value += "z-index: 2;";    
    nextStyle.value += `top: ${targetY}px;`;
    nextStyle.value += `left: ${targetX}px;`;
    nextStyle.value += `width: ${targetWidth}px;`;
    nextStyle.value += `height: ${targetHeight}px;`;
    nextStyle.value += lastPage.value == PageType.Default || isPlayAnimation.value == false ? "transition: none;" : "transition: all 2.0s cubic-bezier(0.25, 0.1, 0.25, 1);";
    nextStyle.value += nextItem.value.getBoundingClientRect().top > 0 ? "visibility: visible !important;" : "visibility: hidden !important;";
    return nextStyle.value;
});

function fnSelectNext(item: serivceItem | null) {
    if (item == null) return;
    lastPage.value = activedPage.value;
    activedPage.value = item.pageType;
    isPlayAnimation.value = true;
}

function updateClientWidth() {
    updateTime.value = Date.now();
    isPlayAnimation.value = false;
}


onMounted(async () => {
    await nextTick();
    updateClientWidth();
    window.addEventListener('resize', updateClientWidth);
    window.addEventListener('scroll', updateClientWidth);
})
onUnmounted(() => {
    window.removeEventListener('resize', updateClientWidth);
    window.removeEventListener('scroll', updateClientWidth);
})
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
}

.services {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    &.mobile {
        justify-content: space-around;
        position: absolute;
        left: 0;
    }
}

.serviceContainer {
    margin-left: 30px;

    &.mobile {
        margin-left: 0;
    }
}

.serviceItem {
    margin: 7px 2px;
}

.service {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    height: 18px;
}

.dark {
    color: white;

    &.active {
        color: #c9c9c9 !important;
        transition: all 1.0s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
}

.light {
    color: black;

    &.active {
        color: #c9c9c9 !important;
        transition: all 1.0s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
}

.displayedText {
    display: flex;
    white-space: nowrap;
    letter-spacing: 2.0px;
    font-size: 18px;
    line-height: 18px;

    /* // 處理中英文字不同高的問題 */
    &.mobile {
        font-size: 14px;
        line-height: 14px;
    }
}
</style>