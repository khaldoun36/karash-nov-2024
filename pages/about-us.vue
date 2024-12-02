<template>
    <main class="full-width px-2 pt-2">
        <NuxtImg
            src="/about-us/hero-image.jpeg"
            alt="About us"
            width="3000"
            height="1687.50"
            class="aspect-[4/3] h-auto max-h-[600px] w-full rounded border border-white/10 object-cover brightness-90 md:aspect-video 2xl:max-h-[720px]"
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
</script>

<style scoped></style>
