<template>
    <div class="container">
        <Transition name="slide-up-item" appear>
            <!-- <NuxtImg :src="icon" :alt="name + ' display'"
                :class="{ 'serviceIcon': true, 'mobile': deviceType == DeviceType.Mobile }" :style="itemStyle"
                loading="eager" /> -->
                <img :src="icon" :alt="name + ' display'"
                :class="{ 'serviceIcon': true, 'mobile': deviceType == DeviceType.Mobile }" :style="itemStyle"
                loading="eager" />
        </Transition>
        <Transition name="slide-up-name" appear>
            <p :class="{ 'serviceName': true, 'mobile': deviceType == DeviceType.Mobile }" :style="nameStyle">{{ name }}
            </p>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DeviceType } from '~/types/DeviceType';
const deviceType = defineModel<DeviceType>('deviceType')

const props = defineProps<{
    index: number,
    totalCount: number,
    icon: string,
    name: string,
}>()

const itemStyle = computed(() => ({
    transitionDelay: `${props.index * 0.2}s`
}))

const nameStyle = computed(() => ({
    transitionDelay: `${props.totalCount * 0.2}s`,
}))
</script>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.serviceIcon {
    height: 150px;
    margin-top: 50px;
    margin-bottom: 10px;

    &.mobile {
        height: 80px;
    }
}

.serviceName {
    font-size: 24px;

    &.mobile {
        font-size: 18px;
    }
}

/*     slide-up-item start     */
.slide-up-item-enter-active,
.slide-up-item-leave-active {
    transition: all 1.0s ease;
}

.slide-up-item-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-item-leave-to {
    opacity: 0;
}

.slide-up-item-enter-to,
.slide-up-item-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-item end     */

/*     slide-up-name start     */
.slide-up-name-enter-active {
    transition: all 2.0s ease;
}

.slide-up-name-leave-active {
    transition: all 1.0s ease;
}

.slide-up-name-enter-from {
    transform: translateY(50px);
    opacity: 0;
}

.slide-up-name-leave-to {
    opacity: 0;
}

.slide-up-name-enter-to,
.slide-up-name-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     slide-up-name end     */
</style>