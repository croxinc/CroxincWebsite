<template>
    <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }">
        <div :class="{ 'textSection': true, 'mobile': deviceType == DeviceType.Mobile }">
            <div :class="{ 'intro': true, 'mobile': deviceType == DeviceType.Mobile }">
                <Transition name="slide-up-title" @after-appear="leaveAnimationCompleted"
                    @after-leave="leaveAnimationCompleted" @before-leave="AnimationBegin" @before-enter="AnimationBegin"
                    appear>
                    <p :class="{ 'title': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">關於
                        Croxinc
                    </p>

                </Transition>
                <Transition name="slide-up-title" appear>
                    <p v-if="showContent" class="description">
                        我們深信每一個企業的需求都是獨特的，您的軟體和網站也應該反映這一點。我們專注於與您緊密合作，從深入了解您的業務流程和挑戰開始，共同設計符合您需求的量身打造解決方案。
                    </p>
                </Transition>
                <transition name="slide-up-creator" appear>
                    <div class="signature" v-if="showContent">
                        <!-- <p class="name">創辦人</p> -->
                        <p class="name">Lester</p>

                    </div>
                </transition>
            </div>
        </div>
        <div :class="{ 'imageSection': true, 'mobile': deviceType == DeviceType.Mobile }">
            <transition name="slide-up" appear>
                <NuxtImg v-if="showContent" :class="{ 'aboutImage': true, 'mobile': deviceType == DeviceType.Mobile }"
                    src="/bg_about.jpg" alt="about" loading="eager" />
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
import { ref } from 'vue';
import { DeviceType } from '~/types/DeviceType';
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);
const showContent = ref(false);
let resolveNavigation: (() => void) | null = null;
let isAnimating = false;

const deviceType = defineModel<DeviceType>('deviceType')
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
}
onBeforeRouteLeave(beforeLeave);
onMounted(() => {
    showContent.value=true;
})
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.mobile {
        flex-direction: column-reverse;
        position: relative;
        top: 0;

    }
}

.textSection {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    width: 50%;
    padding-right: 96px;

    &.mobile {
        justify-content: center;
        width: 90%;
        padding-left: 10%;
        padding-right: 10%;
        position: fixed;
        top: 50vh;
    }
}

.imageSection {
    display: flex;
    justify-content: flex-start;
    width: 50%;
    padding-left: 96px;
    &.mobile {
        position: absolute;
        top: 0;
        justify-content: center;
        width: 100%;
        height: 40vh;
        padding-left: 0px;
    }
}

.intro {
    max-width: 410px;
    align-items: end;
}

.title {
    font-size: 32px;
    font-weight: bolder;
    color: #666;

    &.mobile {
        font-size: 18px;
        color: #000;
        padding-top: 20px;
        padding-bottom: 20px;
    }
}



.aboutImage {
    width: 500px;
    height: 500px;
    max-width: 50vw;
    max-height: 50vh;
    object-fit: contain;
    z-index: -100;
    &.mobile {
        position: fixed;
        height: 50vh;
        width: 100vw;
        object-fit: cover;
        top: 0;
        left: 0;
        max-width: 100vw;
        max-height: 50vh;
    }



}

.description {
    max-width: 410px;
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 20px;
    color: #666;

    /* 20240824 phone */
    @media screen and (max-width: 500px) {
        font-size: 16px;
    }
}

.signature {
    margin-top: 20px;
}

.signature .name {
    font-size: 18px;
    font-style: italic;
    color: #666;
}

/*     slide-up start     */
.slide-up-enter-active {
    transition: all 3s ease;
}

.slide-up-leave-active {
    transition: all 1s ease;
}

.slide-up-enter-from {
    transform: translateY(10%);
    opacity: 0;
}

.slide-up-leave-to {
    transform: translateY(-20%);
    opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up end     */

/*     slide-up-title start     */
.slide-up-title-enter-active {
    transition: all 1.5s ease;
    transition-delay: 0.5s;
}

.slide-up-title-leave-active {
    transition: all 1.0s ease;
}

.slide-up-title-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-title-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}

.slide-up-title-enter-to,
.slide-up-title-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-title end     */

/*     slide-up-creator start     */
.slide-up-creator-enter-active {
    transition: all 2s ease;
    transition-delay: 0.5s;
}

.slide-up-creator-leave-active {
    transition: all 1s ease;
}

.slide-up-creator-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-creator-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}

.slide-up-creator-enter-to,
.slide-up-creator-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-creator end     */
</style>