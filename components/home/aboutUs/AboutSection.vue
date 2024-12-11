<template>
    <section v-if="aboutSection?.title" class="mt-20 md:mt-24 lg:mt-32">
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
        <PartnersSection />
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No about section available
        </h2>
    </section>
</template>

<script setup>
import PartnersSection from "~/components/home/PartnersSection.vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadAboutSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading about section for path ${path}:`, error);
        return null;
    }
};

// Async loading of about sections for different locales
const [enAboutSection, arAboutSection, kuAboutSection, trAboutSection] =
    await Promise.all([
        loadAboutSection("/en/home/about-section"),
        loadAboutSection("/ar/home/about-section"),
        loadAboutSection("/ku/home/about-section"),
        loadAboutSection("/tr/home/about-section"),
    ]);

// Compute the current locale's about section
const aboutSection = computed(() => {
    const localeMap = {
        en: enAboutSection,
        ar: arAboutSection,
        ku: kuAboutSection,
        tr: trAboutSection,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
