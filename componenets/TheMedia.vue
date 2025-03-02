<template>
    <!-- <div class="container"> -->
    <ul class="container">
        <li v-for="(item, index) in socialMedias" :key="index">
            <NuxtLink :to="item.url" target="_blank" class="nuxtLink">
                <NuxtImg :class="{ 'item': true, 'mobile': deviceType == DeviceType.Mobile }"
                    :src="`/${theme == ThemeType.Dark ? 'dark' : 'light'}/${item.icon}`" :alt="item.alt"
                    loading="eager" />
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
interface socialMedia {
    url: string
    icon: string
    alt: string
}
const socialMedias = ref<socialMedia[]>([
    { url: 'mailto:Croxinc.studio@gmail.com', icon: 'mail.png', alt: 'mail' },
    { url: 'https://www.facebook.com/croxinc.studio/', icon: 'fb.png', alt: 'facebook' },
    { url: 'https://www.instagram.com/croxinc.studio/', icon: 'ig.png', alt: 'instagram' },
    { url: 'https://lin.ee/u3jhjn9', icon: 'line.png', alt: 'line' },
]);

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