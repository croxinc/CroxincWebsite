<template>
    <div :class="{ 'container': true, 'mobile': deviceType == DeviceType.Mobile }">
        <div class="description">
            <Transition name="slide-up-item" appear>
                <p v-if="props.showContent"
                    :class="['description-title', { 'mobile': deviceType == DeviceType.Mobile }]" :style="itemStyle">{{
                        props.title }}</p>
            </Transition>
        </div>
        <div :class="{ 'imageContainer': true, 'mobile': deviceType == DeviceType.Mobile }">
            <Transition name="slide-up-item" appear>
                <!-- <NuxtImg v-if="props.showContent" :class="['item-image', { 'mobile': deviceType == DeviceType.Mobile }]"
                    :src="props.image" :alt="props.title" :style="itemStyle" loading="eager" /> -->
                    <img v-if="props.showContent" :class="['item-image', { 'mobile': deviceType == DeviceType.Mobile }]"
                    :src="props.image" :alt="props.title" :style="itemStyle" loading="eager" />
            </Transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { DeviceType } from '~/types/DeviceType';
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);

const props = defineProps<{
    showContent: boolean,
    index: number,
    title: string,
    image: string,
}>();
const itemStyle = computed(() => ({
    transitionDelay: `${props.index * 0.2}s`
}));
const deviceType = defineModel<DeviceType>('deviceType')
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.imageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 540px;
    height: 240px;
    overflow: visible;
    padding: 24px 20px;

    &.mobile {
        padding: 0;
        width: 80vw;
        max-height: 150px;
        padding: 0;
    }
}

.item-image {
    width: 100%;
    height: 100%;
    border: 5px solid rgba(0, 0, 0, 0.8);
    border-radius: 30px;
    object-fit: cover;

    &.mobile {
        width: 90%;
        height: 100%;
        border: 3px solid rgba(0, 0, 0, 0.8);
    }
}

.description-title {
    font-size: 36px;
    font-weight: bolder;

    &.mobile {
        margin-top: 0;
        font-size: 18px;
        font-weight: bold;
    }
}

/*     slide-up-item start     */
.slide-up-item-enter-active,
.slide-up-item-leave-active {
    transition: all 1.0s ease;
}

.slide-up-item-enter-from {
    transform: translate3d(-10px, -10px, 0);
    opacity: 0;
}

.slide-up-item-leave-to {
    transform: translate3d(10px, 10px, 0);
    opacity: 0;
}

.slide-up-item-enter-to,
.slide-up-item-leave-from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}

/*     slide-up-item end     */
</style>