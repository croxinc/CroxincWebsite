interface contactItem {
    name: string;
    link: string;
    icon: string;
    action: | '_blank' | 'openForm'
}

const contactItems = ref<contactItem[]>([
    { name: '電子郵件', link: 'mailto:Croxinc.studio@gmail.com', icon: '/images/light/mail.png', action: '_blank' },
    { name: 'Facebook', link: 'https://www.facebook.com/croxinc.studio/', icon: '/images/light/fb.png', action: '_blank' },
    { name: 'Instagram', link: 'https://www.instagram.com/croxinc.studio/', icon: '/images/light/ig.png', action: '_blank' },
    { name: 'Line@', link: 'https://line.me/R/ti/p/@134sbzgh?ts=04241459&oat_content=url', icon: '/images/light/line.png', action: '_blank' },
    { name: '填寫表單', link: '', icon: '/images/order.png', action: 'openForm' }
]);

export default contactItems