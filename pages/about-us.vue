<template>
    <Head>
        <Title>{{ pageTitle }}</Title>
    </Head>
    <main class="full-width px-2 pt-2">
        <NuxtImg
            :src="aboutUsImage"
            alt="About us"
            width="3000"
            height="1687.50"
            class="aspect-[4/3] h-auto max-h-[720px] w-full rounded border border-white/10 object-cover brightness-90 md:aspect-video 2xl:max-h-[720px]"
        />
        <div class="wrapper">
            <HeroSection />
            <MobileAchievements />
            <DesktopAchievments />
            <GuidingPrinciples />
        </div>
    </main>
</template>

<script setup>
import HeroSection from "@/components/about-us/HeroSection.vue";
import MobileAchievements from "~/components/home/aboutUs/MobileAchievements.vue";
import DesktopAchievments from "~/components/home/aboutUs/DesktopAchievments.vue";
import GuidingPrinciples from "~/components/about-us/GuidingPrinciples.vue";

import aboutUsImage from "/about-us/hero-image.jpeg";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

const pageTitle = computed(() => {
    switch (currentLocale.value) {
        case "tr":
            return "Karash® Şirketi - Hakkımızda";
        case "ar":
            return "شركة كاراش® - من نحن";
        case "ku":
            return "کۆمپانیای کاراش® - دەربارەی ئێمە";
        default:
            return "Karash® Company - About Us";
    }
});
</script>

<style scoped></style>
