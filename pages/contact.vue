<template>
    <div class="container">
        <Transition name="slide-up-title" @after-appear="leaveAnimationCompleted" @after-leave="leaveAnimationCompleted"
            @before-leave="AnimationBegin" @before-enter="AnimationBegin" appear>
            <div :class="{ 'title': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">如何聯絡我們？</div>
        </Transition>
        <Transition name="slide-up-title" appear>
            <div :class="{ 'description': true, 'mobile': deviceType == DeviceType.Mobile }" v-if="showContent">
                <!-- 若您有想要客製的網站系統、Windows用的系統或工具！ 多元的解決方案，可以隨時與我們聯絡。 -->
                若您有想要製作的軟體系統、跨系統整合或是作業上需要利於作業的工具的需求，可以隨時和我們聯絡討論。
            </div>
        </Transition>
        <transition-group name="slide-up-title" appear>
            <ul :class="['contactItems', { 'mobile': deviceType == DeviceType.Mobile }]" :key="'x'">
                <li v-for="(item, index) in cItems" :key="item.link" v-if="showContent"
                    :class="['contactItem', { 'mobile': deviceType == DeviceType.Mobile }]">
                    <div :class="['itemContainer', { 'mobile': deviceType == DeviceType.Mobile }]">
                        <NuxtLink :to="item.link" target="_blank"
                            :class="['nuxtLink', { 'mobile': deviceType == DeviceType.Mobile }]">
                            <img :class="{ 'icon': true, 'mobile': deviceType == DeviceType.Mobile }"
                                :src="`${item.icon}`" :alt="item.name" loading="eager" />
                            <span :class="['iconName', { 'mobile': deviceType == DeviceType.Mobile }]">{{
                                item.name }}</span>
                        </NuxtLink>
                    </div>
                </li>
            </ul>
        </transition-group>
        <teleport to="body">
            <div v-if="isFormVisible" class="form-overlay">
                <div class="form-container">
                    <button @click="toggleForm" class="close-button">關閉表單</button>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfBnVEk5mT0sDzCtWDQEgspt3VGG7IRSSGcUXdE761mGyIEtA/viewform?embedded=true"
                        width="100%" height="980" frameborder="0" marginheight="0" marginwidth="0">
                        載入中…
                    </iframe>
                    <span class="version" style="color: #666;">1.0.1.0714003</span>
                </div>
            </div>
        </teleport>
    </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'main' })
import { ref } from 'vue';
import { DeviceType } from '~/types/DeviceType';
let resolveNavigation: (() => void) | null = null;
const showContent = ref(false);
let isAnimating = false;
const deviceType = defineModel<DeviceType>('deviceType')
const emit = defineEmits(['AnimationCompleted', 'AnimationStart']);

// import { contactItems } from '~/utils/contactMap'
// const contactItems = ref(contactItems);

import contactItems from '~/utils/contactMap';
const cItems = ref(contactItems);

const isFormVisible = ref(false);

function toggleForm() {
    isFormVisible.value = !isFormVisible.value;
}


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

function fnClickHyperAction(action: '_blank' | 'openForm', url: string) {
    if (action == 'openForm') {
        // hyperlink open form
        isFormVisible.value = !isFormVisible.value;
    }
    if (action == '_blank') {
        window.open(url, '_blank');

    }
}
onMounted(() => {
    showContent.value = true;
})
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0px auto;
    color: #333;

}

.title {
    margin: 0px 10px;
    font-size: 24px;
    font-weight: bolder;
    text-align: center;
    align-items: center;

    &.mobile {
        padding-top: 0px;
        padding: 12px;
    }
}

.description {
    margin: 20px auto 0px auto;
    line-height: 1.5;
    font-size: 24px;
    text-align-last: center;
    width: 51%;


    &.mobile {
        margin-top: 12px;
        width: 92%;
        font-size: 18px;
    }
}

.contactItems {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    flex-wrap: wrap;
    padding: 0;
    margin: 72px;

    &.mobile {
        margin: 36px 10px;
    }
}

.itemContainer {
    flex: 1 1 50%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.mobile {
        display: flex;
        margin-bottom: 24px;
    }
}

.nuxtLink {
    display: flex;
    align-items: center;
}

.icon {
    height: 30px;
    width: auto;
    margin-right: 10px;
    vertical-align: middle;

    &.mobile {
        height: auto;
        width: 30px;
        margin-left: 30px;
    }
}

.contactItem {

    margin: 0;
    padding: 0;
    font-size: 24px;
    animation: fadeIn 1.5s forwards;

    &.mobile {
        flex: 1 1 50%;
        box-sizing: border-box;
    }

    &:hover {
        transition: transform 0.2s;
        transform: scale(1.1);
        cursor: pointer;

        .iconName {
            transition: transform 0.2s;
            transform: scale(1.2);
            font-size: 26.4px;
        }

        .icon {
            transition: transform 0.2s;
            transform: scale(1.2);
        }
    }


}

.iconName {
    text-align: left;
}


.form-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: auto;
}

.form-container {
    background-color: white;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
    position: relative;
    overflow: auto;
    max-height: 90vh;
}

.close-button {
    position: fixed;
    top: 20px;
    /* left: 50%; */
    right: 50px;
    border-radius: 10%;
    border: none;
    padding: 10px;
    font-size: 18px;
    transform: translateX(-50%);
    background: rgb(103, 58, 183);
    color: white;
    cursor: pointer;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}



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
</style>