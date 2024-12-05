<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <div class="xl:items-top xl:flex xl:gap-32">
            <h2
                class="whitespace-nowrap text-3xl md:text-4xl lg:text-5xl xl:-mt-1"
            >
                {{ aboutSection?.title }}
            </h2>
            <div class="mt-8 xl:mt-0 xl:flex xl:gap-8">
                <p
                    class="mt-4 max-w-prose text-base md:text-lg xl:mt-0 xl:flex-1"
                    v-for="text in aboutSection?.subTitle"
                >
                    {{ text }}
                </p>
            </div>
        </div>
        <MobileAchievements />
        <DesktopAchievments />
    </section>
</template>

<script setup>
import MobileAchievements from "./MobileAchievements.vue";
import DesktopAchievments from "./DesktopAchievments.vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Watch for locale changes and refetch header data
const { data: aboutSection } = await useAsyncData(
    "about-section",
    () => queryContent(`/${currentLocale.value}/home/about-section`).findOne(),
    {
        watch: [currentLocale],
    }
);
</script>

<style scoped></style>
