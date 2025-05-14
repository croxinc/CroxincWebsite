<template>
    <!-- <div class="container"> -->
    <ul class="container">
        <li v-for="(item, index) in socialMedias" :key="index">
            <NuxtLink :to="item.url" target="_blank" class="nuxtLink">
                <!-- <NuxtImg :class="{ 'item': true, 'mobile': deviceType == DeviceType.Mobile }"
                    :src="`/images/${theme == ThemeType.Dark ? 'dark' : 'light'}/${item.icon}`" :alt="item.alt"
                    loading="eager" /> -->
                <img :class="{ 'item': true, 'mobile': deviceType == DeviceType.Mobile }"
                    :src="`/images/${theme == ThemeType.Dark ? 'dark' : 'light'}/${item.icon}`" :alt="item.alt"
                    loading="eager" @load="loadedImage( item.id)" />
            </NuxtLink>
        </li>
    </ul>
    <!-- </div> -->
</template>
<script setup lang="ts">
import { DeviceType } from '~/types/DeviceType';
import { ThemeType } from '~/types/ThemeType';
const deviceType = defineModel<DeviceType>('deviceType')
const theme = defineModel<ThemeType>('theme')
const emits = defineEmits(['loaded']);
interface socialMedia {
    url: string
    icon: string
    alt: string
    loaded?: boolean,
    id: number
}
const socialMedias = ref<socialMedia[]>([
    { id: 1, url: 'mailto:Croxinc.studio@gmail.com', icon: 'mail.png', alt: 'mail', loaded: false },
    { id: 2, url: 'https://www.facebook.com/croxinc.studio/', icon: 'fb.png', alt: 'facebook', loaded: false },
    { id: 3, url: 'https://www.instagram.com/croxinc.studio/', icon: 'ig.png', alt: 'instagram', loaded: false },
    { id: 4, url: 'https://lin.ee/u3jhjn9', icon: 'line.png', alt: 'line', loaded: false },
]);

const loadedImage = (id: number) => {
    const index = socialMedias.value.findIndex(item => item.id === id);
    if (index !== -1) {
        socialMedias.value[index].loaded = true;
    }
}

watch(socialMedias, (newVal) => {
    const allLoaded = newVal.every(item => item.loaded);
    if (allLoaded) {
        emits('loaded');
    }
}, { deep: true });

</script>
<style scoped>
.container {
    justify-content: flex-end;
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0;
}

.nuxtLink {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.item {
    max-height: 18px;
    margin-left: 16px;
}
</style>