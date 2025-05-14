<template>
    <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">
        <div :class="{ 'cardContainer': true, 'mobile': deviceType == DeviceType.Mobile }">
            <div class="imageContainer">
                <Transition name="slide-up-item" :class="{ 'mobile': deviceType == DeviceType.Mobile }" appear>
                    <!-- <NuxtImg
                        :class="{ 'itemImage': true, 'mobile': deviceType == DeviceType.Mobile, 'arrowImage': isArrow }"
                        :src="itemImage" :alt="itemTitle" :style="itemStyle" loading="eager" /> -->
                        <img
                        :class="{ 'itemImage': true, 'mobile': deviceType == DeviceType.Mobile, 'arrowImage': isArrow }"
                        :src="itemImage" :alt="itemTitle" :style="itemStyle" loading="eager" />
                </Transition>
            </div>
        </div>
        <div :class="{ 'cardContainer': true, 'mobile': deviceType == DeviceType.Mobile, 'arrowText': isArrow }">
            <div :class="{ 'textContainer': true, 'mobile': deviceType == DeviceType.Mobile }">
                <div class="description">
                    <Transition name="slide-up-item" :class="{ 'mobile': deviceType == DeviceType.Mobile }" appear>
                        <p class="descriptionTitle" :style="itemStyle">{{ itemTitle }}</p>
                    </Transition>
                    <template v-for="desc in itemDescription">
                        <Transition name="slide-up-item" :class="{ 'mobile': deviceType == DeviceType.Mobile }" appear>
                            <p class="descriptionText" :style="itemStyle">{{ desc }}</p>
                        </Transition>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { DeviceType } from '~/types/DeviceType';

const itemIndex = defineModel<number>('index')
const itemDescription = defineModel<string[]>('description')
const deviceType = defineModel<DeviceType>('deviceType')
const isArrow = defineModel<boolean>('isArrow')
const mobileImage = defineModel<string>('mobileImage')
const defaultImage = defineModel<string>('image')
const itemImage = computed(() => {
    return deviceType.value == DeviceType.Mobile ? mobileImage.value : defaultImage.value
})
const itemTitle = defineModel<string>('title')
const itemStyle = computed(() => ({
    transitionDelay: `${itemIndex.value! * 0.2}s`
}))
const showContent = ref(false);
onMounted(() => {
    showContent.value = true;
})
</script>
<style scoped>
.container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: visible;
    user-select: none;

    &.mobile {
        font-size: 1px;
        flex-direction: row;

    }
}

.cardContainer {
    display: flex;

    &.mobile {
        width: 50vw;
        padding-left: 15px;
        padding-right: 15px;
    }
}

.imageContainer {
    flex: 1;
    width: 200px;
    height: auto;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    /* padding: 20px; */

    @media screen and (max-width: 1365px) and (min-width: 1000px) {
        width: 140px;
        height: 105px;
    }
}

.itemImage {
    height: 100%;
    width: 100%;

    &.mobile {
        width: 50%;
        height: auto;

    }
}

.arrowImage {
    width: 105px;

    &.mobile {
        height: 45px;
        width: auto;
    }
}


.descriptionTitle {
    margin: 10px 0;
    font-size: 24px;
    font-weight: bolder;

}

.descriptionText {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
}

.textContainer {
    height: 100px;

    &.mobile {
        text-align: left;
        height: auto;

    }
}

/*     slide-up-item start     */
.slide-up-item-enter-active,
.slide-up-item-leave-active {
    transition: all 1.0s ease;
}

.slide-up-item-enter-from,
.slide-up-item-leave-to {
    transform: translateX(-10px);
    opacity: 0;

    &.mobile {
        transform: translateY(-10px);
    }
}

.slide-up-item-enter-to,
.slide-up-item-leave-from {
    transform: translateX(0);
    opacity: 1;
}

/*     slide-up-item end     */
</style>