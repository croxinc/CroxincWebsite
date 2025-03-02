<template>
    <div class="container">
        <div :class="{ 'flowchart': true, 'mobile': deviceType == DeviceType.Mobile }">
            <div v-for="(step, index) in currentProject" :key="index"
                :class="{ 'stepContainer': true, 'mobile': deviceType == DeviceType.Mobile }">
                <TheProjectItem :showContent="showContent" :title="step.title" :image="step.image" :index="index"
                    :deviceType="deviceType" />
            </div>
        </div>

        <transition name="overlay-effects" @after-appear="leaveAnimationCompleted"
            @after-leave="leaveAnimationCompleted" @before-leave="AnimationBegin" @before-enter="AnimationBegin" appear>
            <div v-if="showContent" class="overlay-content" style="height: 0px;">
                <!-- 用來處理動畫事件的dummy空白元素，勿刪 -->
            </div>
        </transition>
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
// import { ref, onMounted, computed } from 'vue';
import TheProjectItem from '~/componenets/TheProjectItem.vue';
import { DeviceType } from '~/types/DeviceType';

const showContent = ref(false);
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);

interface Step {
    index: number;
    title: string;
    image: string;
}
const deviceType = defineModel<DeviceType>('deviceType')

const currentIndex = ref(0);
const projects = ref<Step[]>([
    { title: '後端串接展示', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/api.gif', index: 0 },
    { title: '訂單管理', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/ordering.gif', index: 1 },
    { title: '跨系統整合展示', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/qs.gif', index: 2 },
    { title: '各類工具製作', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/tool-demo.gif', index: 3 },
    { title: 'RPA流程整合', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/RPA.png', index: 4 },
    { title: '即時銷售監控', image: 'https://raw.githubusercontent.com/croxinc/portfolio-images/master/monitorSchedule.png', index: 5 },
]);

const currentProject = computed(() => {
    return projects.value.slice(currentIndex.value, currentIndex.value + 2);
});

const startInterval = () => {
    setInterval(() => {
        if (currentIndex.value < projects.value.length - 1) {
            currentIndex.value = (currentIndex.value + 2) % projects.value.length;
        }
    }, 5000);
}

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
    showContent.value = true
    startInterval();
})
</script>


<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0 auto;
}

.flowchart {    
    display: flex;
    align-items: center;
    justify-content: center;    

    &.mobile {
        flex-direction: column;
    }
}

.stepContainer {    
    margin: 0 36px;
    position: relative;


    &.mobile {
        margin: 0;
        margin-bottom: 24px;

    }
}

.overlay {
    background-color: white;
    position: absolute;
    opacity: 0.5;
    z-index: 1;
    top: 0;
    left: 0;
}

.overlay-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;
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
