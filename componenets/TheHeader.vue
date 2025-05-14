<template>
    <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }">
        <NuxtLink to="/" :class="{ 'logos': true, 'mobile': deviceType == DeviceType.Mobile }">
            <!-- <NuxtImg class="logo" :src="`/images/${theme == ThemeType.Dark ? 'dark' : 'light'}/logo.png`" loading="eager" /> -->
            <img class="logo" :src="`/images/${theme == ThemeType.Dark ? 'dark' : 'light'}/logo.png`" loading="eager" />
        </NuxtLink>
        <div :class="{ 'services': true, 'mobile': deviceType == DeviceType.Mobile }">
            <TheService :theme="theme" :activedPage="activedPage" :lastPage="lastPage" :deviceType="deviceType" v-if="isResourceLoaded" />
        </div>
        <div :class="{ 'medias': true, 'mobile': deviceType == DeviceType.Mobile }">
            <TheMedia :theme="theme" @loaded="loadedResource"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ThemeType } from '@/types/ThemeType';
import { DeviceType } from '@/types/DeviceType';
import TheMedia from './TheMedia.vue';
import TheService from './TheService.vue';
import { PageType } from '@/types/PageType';
import { OperatorType } from '@/types/OperatorType';
const theme = defineModel<ThemeType>('theme')
const deviceType = defineModel<DeviceType>('deviceType')
const activedPage = defineModel<PageType>('activedPage')
const lastPage = ref<PageType>(PageType.Default)

const router = useRouter();
let startX = 0
let startY = 0

const opType = ref<OperatorType>(OperatorType.None);
const scrollPosition = ref(0)
const windowHeight = ref(0)
const pageHeight = ref(0)
const isResourceLoaded = ref(false)


function loadedResource(){
    isResourceLoaded.value = true;

}

// // 檢查是否滾動到了頁面的頂部或底部
// const checkScrollEnd = (event: WheelEvent) => {
//     scrollPosition.value = window.scrollY
//     windowHeight.value = window.innerHeight
//     pageHeight.value = document.documentElement.scrollHeight

//     console.log("opType", opType.value)
//     console.log('scrollPosition', scrollPosition.value, 'windowHeight', windowHeight.value, 'pageHeight', pageHeight.value)
//     if (scrollPosition.value === 0 && event.deltaY < 0 && opType.value == OperatorType.PreviousPage) {
//         // 滾到頂部且繼續向上滑動，導航到上一頁
//         // router.push('/prev-page') // 根據實際路由設置上一頁的路徑
//         router.push(fnGetPageItemByOperation(activedPage.value!, opType.value).url)
//     } else if (scrollPosition.value + windowHeight.value >= pageHeight.value && event.deltaY > 0 && opType.value == OperatorType.NextPage) {
//         // 滾到底部且繼續向下滑動，導航到下一頁
//         // router.push('/next-page') // 根據實際路由設置下一頁的路徑
//         router.push(fnGetPageItemByOperation(activedPage.value!, opType.value).url)
//     }
// }


// 觸摸開始事件，記錄開始位置
const handleTouchStart = (event: TouchEvent) => {
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY

}

// 觸摸結束事件，判斷滑動方向
const handleTouchEnd = (event: TouchEvent) => {
    const endX = event.changedTouches[0].clientX
    const endY = event.changedTouches[0].clientY
    const diffX = endX - startX
    const diffY = endY - startY

    //滑的靈敏度
    //if (Math.abs(diffY) < 100) return;
    if (Math.abs(diffY) < 180) return;
    opType.value = diffY < 0 ? OperatorType.NextPage : OperatorType.PreviousPage
    scrollPosition.value = window.scrollY
    windowHeight.value = window.innerHeight
    pageHeight.value = document.documentElement.scrollHeight
    if (scrollPosition.value === 0 && opType.value == OperatorType.PreviousPage) {
        router.push(fnGetPageItemByOperation(activedPage.value!, opType.value).url)
    } else if (scrollPosition.value + windowHeight.value >= pageHeight.value && opType.value == OperatorType.NextPage) {
        // 滾到底部且繼續向下滑動，導航到下一頁
        // router.push('/next-page') // 根據實際路由設置下一頁的路徑
        router.push(fnGetPageItemByOperation(activedPage.value!, opType.value).url)
    }

    // // 判斷是否是橫向滑動，並且判斷滑動方向
    // // console.log(diffX)
    // if (Math.abs(diffX) < 100) return;
    // if (Math.abs(diffX) > Math.abs(diffY)) {
    //     if (diffX < 0) {
    //         var item = fnGetPageItemByOperation(activedPage.value!, OperatorType.NextPage)
    //         router.push(item.url);
    //     } else {
    //         var item = fnGetPageItemByOperation(activedPage.value!, OperatorType.PreviousPage)
    //         router.push(item.url);
    //     }
    // }
}

onMounted(() => {
    //只有手機版才有這個功能(touchstart/touchend)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

})

onBeforeUnmount(() => {
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
})

</script>
<style scoped>
.container {
    display: flex;
    align-items: center;

    &.mobile {
        flex-wrap: wrap;
        position: relative;
    }
}

.logos {
    display: flex;
    align-items: center;

    &.mobile {
        flex: 1;
        order: 1;
    }
}

.logo {
    height: 100%;
    height: 18px;
}

.medias {
    margin-left: 16px;
    display: block;

    &.mobile {
        order: 2;
    }
}

.services {
    flex: 1;
    height: 18px;
    display: flex;


    &.mobile {
        flex: 1 1 100%;
        order: 3;
    }
}
</style>