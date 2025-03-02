<template>
    <div class="container">
        <div :class="['service-intro',{'mobile': deviceType == DeviceType.Mobile}]">
            <Transition name="slide-up-title" appear>
                <div :class="{ 'title': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">
                    專屬客製化解決方案<br />全面提升效率與競爭力！</div>
            </Transition>
            <Transition name="slide-up-description" @after-appear="leaveAnimationCompleted"
                @after-leave="leaveAnimationCompleted" @before-leave="AnimationBegin" @before-enter="AnimationBegin"
                appear>
                <div :class="{ 'description': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">
                    我們致力於為中小企業、新創企業以及需要高度客製化流程的企業，提供量身訂製的管理系統。<br>
                    如軟體自動化流程規劃(RPA)、訂單系統、客戶關係管理、人事管理系統，亦或是各類的跨系統整合。<br />
                    都能根據您的需求進行， 助您實現業務流程的自動化和數位化轉型。
                </div>
            </Transition>
        </div>
        <div class="item-container">
            <transition name="slide-close-items">
                <TheServiceItemList v-if="showContent" :isVisible="true" :deviceType="deviceType" />
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
const deviceType = defineModel<DeviceType>('deviceType')
import TheServiceItemList from '~/componenets/TheServiceItemList.vue';
import { DeviceType } from '~/types/DeviceType';
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);
const showContent = ref(false);
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
}
onBeforeRouteLeave(beforeLeave);
onMounted(() => {
    showContent.value = true;
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    line-height: 1.6;
    width: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    top: 0;
}

.service-intro{
    &.mobile{
        margin-top: 12px;
    }
}

.title {
    font-size: 48px;
    padding-bottom: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    &.mobile {
        font-size: 26px;
        line-height: 30px;
    }
}

.description {
    font-size: 18px;
    margin: 0 auto;
    padding-bottom: 48px;
    text-align: center;
    justify-content: center;
    line-height: 2;
    letter-spacing: 1px;
    text-align-last: center;

    &.mobile {
        width: 92%;
        line-height: 30px;
        padding-bottom: 8px;
        font-size: 15px;
        letter-spacing: 0;
    }

}

.item-container {
    width: 100%;
}

/*     slide-up-title start     */
.slide-up-title-enter-active {
    transition: all 2.0s ease;
}

.slide-up-title-leave-active {
    transition: all 1.0s ease;
}

.slide-up-title-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-title-leave-to {
    opacity: 0;
    transform: translateY(0px);
}

.slide-up-title-enter-to,
.slide-up-title-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-title end     */

/*     slide-up-description start     */
.slide-up-description-enter-active {
    transition: all 1.8s ease;
    transition-delay: 0.2s;
}


.slide-up-description-leave-active {
    transition: all 1.0s ease;
}

.slide-up-description-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-description-leave-to {
    opacity: 0;
    transform: translateY(0px);
}

.slide-up-description-enter-to,
.slide-up-description-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-description end     */


/*     slide-close-items start     */
.slide-close-items-enter-active {
    transition: all 1.8s ease;
    transition-delay: 0.2s;
}


.slide-close-items-leave-active {
    transition: all 1.0s ease;
}

.slide-close-items-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-close-items-leave-to {
    opacity: 0;
    transform: translateY(0px);
}

.slide-close-items-enter-to,
.slide-close-items-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-description end     */
</style>
