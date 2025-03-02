<template>
    <div class="container">
        <transition name="home-effects" @after-appear="leaveAnimationCompleted" @after-leave="leaveAnimationCompleted"
            @before-leave="AnimationBegin" @before-enter="AnimationBegin" appear mode="out-in">
            <div v-if="showContent" class="background">
                <NuxtImg src="bg_home.jpg" alt="background" loading="eager" style="width: 100%;height: 100%;" />
            </div>
        </transition>
        <transition name="overlay-effects" appear>
            <div class="background-overlay"></div>
        </transition>
        <transition name="description-effects" appear>
            <div class="description">
                為您的企業搭建成功的基石
            </div>
        </transition>
        <div class="flicker">
            <NuxtLink to="/about">
                <NuxtImg src="/scroll_down.png" alt="scroll down" class="scroll-down" loading="eager" />
            </NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
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
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    /* background-image: url('~/assets/images/bg_home.jpg'); */
    /* background-image: url('/images/bg_home.jpg'); */
    background-size: cover;
    background-position: center;
    z-index: -1;
}


.flicker {
    position: absolute;
    bottom: 36px;
    animation: flicker 3s infinite;
    max-width: 100px;
    justify-content: center;




    @media screen and (max-width: 500px) {
        bottom: 98px
    }
}

@keyframes flicker {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}


.description {
    position: absolute;
    bottom: 84px;
    font-size: 18px;
    letter-spacing: 2.0px;
    color: white;
    animation: fadeIn 1s ease-in-out;
    display: flex;
    justify-content: center;
    /* nowap */
    white-space: nowrap;

    /* text-align: center; */
    /* background-color: white; */
    /* margin: 0 auto; */
    @media screen and (max-width: 500px) {
        bottom: 148px
    }
}

.scroll-down {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}


/*     description-effects start     */
.description-effects-enter-active,
.description-effects-leave-active {
    transition: all 1.0s ease;
    /* transition-delay: 0.5s; */
}

.description-effects-enter-from,
.description-effects-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

.description-effects-enter-to,
.description-effects-leave-from {
    transform: translateY(0);
    opacity: 1;
}

/*     description-effects end     */


/*     overlay-effects start ( DONOT COPY THIS)     */
.overlay-effects-leave-active {
    transition: all 1.4s ease-in-out;
}

.overlay-effects-leave-from {
    transform: translateY(0);
}

.overlay-effects-leave-to {
    transform: translateY(-75%);
}

/*     overlay-effects end     */
/*     home-effects start     */
.home-effects-enter-active {
    transition: all 1.5s ease-in-out;
}

.home-effects-leave-active {
    /* transition: all 1.0s ease-in-out; */
    transition: all 1.2s ease-in-out;
}

.home-effects-enter-from {
    opacity: 0;
    transform: scale(1.5);
}

.home-effects-enter-to {
    opacity: 1;
    transform: scale(1);
}

.home-effects-leave-from {
    transform: translateY(0);
}

.home-effects-leave-to {
    transform: translateY(-100%);
}

/*     home-effects end     */
</style>