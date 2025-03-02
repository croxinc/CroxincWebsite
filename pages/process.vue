<template>
    <div :class="['container',{'mobile': deviceType == DeviceType.Mobile}]">
        <div :class="{ 'flowchart': true, 'mobile': deviceType == DeviceType.Mobile }">
            <div v-for="(step, index) in steps" :key="index">
                <TheProcessItem :title="step.title" :description="step.description" :image="step.image" :mobile-image="step.mobileImage"
                    :isArrow="step.isArrow" :index="index" :deviceType="deviceType"></TheProcessItem>
            </div>
        </div>
        <!-- <transition name="overlay-effects" @after-appear="leaveAnimationCompleted"
            @after-leave="leaveAnimationCompleted" @before-leave="AnimationBegin" @before-enter="AnimationBegin" appear>
            <div v-if="showContent" class="overlay-content"></div>
        </transition>

        <transition name="overlay-effects" :class="{ 'mobile': deviceType == DeviceType.Mobile }"
            @after-appear="leaveAnimationCompleted" @after-leave="leaveAnimationCompleted"
            @before-leave="AnimationBegin" @before-enter="AnimationBegin" appear>
            <span v-if="!showContent" class="overlay"></span>
        </transition> -->
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
import { ref } from 'vue';
import TheProcessItem from '~/componenets/TheProcessItem.vue';
import { DeviceType } from '~/types/DeviceType';

const showContent = ref(true);
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);
const deviceType = defineModel<DeviceType>('deviceType')
interface Step {
    isArrow: boolean;
    title: string;
    description: string[];
    image: string;
    mobileImage: string;
}

const steps = ref<Step[]>([
    { title: '釐清專案', description: ['需求評估', '初步報價'], image: '/釐清專案.png', isArrow: false, mobileImage: '/釐清專案.png' },
    { isArrow: true, title: '', description: [''], image: '/right-arrow.png', mobileImage: '/down-arrow.png' },
    { title: '確認合作', description: ['項目細節討論', '專案時間訂定', '訂金支付'], image: '/確認合作.png', isArrow: false, mobileImage: '/確認合作.png' },
    { isArrow: true, title: '', description: [''], image: '/right-arrow.png', mobileImage: '/down-arrow.png' },
    { title: '專案進行', description: ['執行項目說明', '規格文件確認', '階段交付專案', '專案測試'], image: '/專案進行.png', isArrow: false, mobileImage: '/專案進行.png' },
    { isArrow: true, title: '', description: [''], image: '/right-arrow.png', mobileImage: '/down-arrow.png' },
    { title: '驗收結案', description: ['專案驗收', '尾款支付', '專案保固'], image: '/驗收結案.png', isArrow: false, mobileImage: '/驗收結案.png' },
]);

let resolveNavigation: (() => void) | null = null;
let isAnimating = false;

const leaveAnimationCompleted = () => {
    emit('AnimationCompleted');
    if (resolveNavigation) {
        resolveNavigation();
        resolveNavigation = null;
    }
    isAnimating = false;
};

const beforeLeave = () => {
    return new Promise<void>((resolve) => {
        if (!isAnimating) {
            showContent.value = false;
            isAnimating = true;
            resolveNavigation = resolve;
        } else {
            resolve();
        }
    });
};

const AnimationBegin = () => {
    emit('AnimationStart');
};

onBeforeRouteLeave(beforeLeave);
onMounted(() => {
    showContent.value = true;
})
</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 100vw;
    min-height: 60%;
    padding: 24px 0;
    margin: 0 auto;
    &.mobile{
        padding-top: 0;
    }

}

.flowchart {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    &.mobile {
        flex-direction: column;
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: fixed;
    opacity: 0.1;
    z-index: 1;
}

.overlay-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
}

/* overlay-effects start */
.overlay-effects-enter-active {
    transition: all 1.5s ease;
    transition-delay: 0.5s;
}

.overlay-effects-leave-active {
    transition: all 1.5s ease;
}

.overlay-effects-enter-from {
    transform: translateX(-100%);
    opacity: 1;

    &.mobile {
        transform: translateY(100%);
    }
}

.overlay-effects-leave-to {
    transform: translateY(0);
    opacity: 0;
}

.overlay-effects-enter-to,
.overlay-effects-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/* overlay-effects end */
</style>
