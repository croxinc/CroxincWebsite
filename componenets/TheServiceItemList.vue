<template>
    <div class="services">
        <transition-group name="slide-up-item" v-if="isVisible">
            <TheServiceItem class="service" v-for="(item, index) in services" :key="index" :icon="item.path"
                :name="item.displayText" :index="index" :total-count="services.length" :deviceType="deviceType" />
        </transition-group>
    </div>
</template>

<script setup lang="ts">

import { DeviceType } from '~/types/DeviceType';
import TheServiceItem from './TheServiceItem.vue';

defineProps<{ isVisible: boolean }>();
const deviceType = defineModel<DeviceType>('deviceType')
interface Service {
    path: string,
    displayText: string
}
const services = ref<Service[]>([
    { displayText: '流程規劃', path: '/images/MINICRM.png' },
    { displayText: '訂單系統', path: '/images/order.png' },
    { displayText: '跨系統整合', path: '/images/integrate.png' },
    { displayText: '內部系統開發', path: '/images/internalsystem.png' },
])
</script>

<style scoped>
.services {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    /* width: 80vw; */
    width: 100%;
    @media screen and (max-width: 1100px) and (min-width: 500px) {
        width: 60%;
        margin: 0 auto;
    }

    @media screen and (max-width: 500px) {
        width: 100%;
    }
}

.service {
    @media screen and (max-width: 500px) {
        display: flex;
        flex: 2 1 40%;
        justify-content: center;
        align-items: center;
        flex-direction: column;


    }
}

/*     slide-up-item start     */
.slide-up-item-enter-active {
    transition: all 1.0s ease;
    transition-delay: 0.2s;
}

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
</style>