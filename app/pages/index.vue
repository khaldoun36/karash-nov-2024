<template>
    <HeroSection />
    <AboutSection />
    <LazyLatestNews hydrate-on-idle />
    <ServicesSection />
    <StoreLocations />
    <ProjectsSection />
    <ContactUsSection />
</template>

<script setup>
import AboutSection from "~/components/home/aboutUs/AboutSection.vue";
import HeroSection from "~/components/home/HeroSection.vue";
import ServicesSection from "~/components/home/ServicesSection.vue";
import StoreLocations from "~/components/home/StoreLocations.vue";
import ProjectsSection from "~/components/home/projects/ProjectsSection.vue";
import ContactUsSection from "~/components/home/ContactUsSection.vue";

const LazyLatestNews = defineLazyHydrationComponent(
    "idle",
    () => import("~/components/home/LatestNews.vue")
);
</script>

<style scoped></style>
