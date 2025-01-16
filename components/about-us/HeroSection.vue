<template>
    <div class="mt-20 md:mt-24 lg:mt-32">
        <div class="grid items-start gap-8 lg:grid-cols-2">
            <h1 class="text-2xl md:text-4xl lg:text-5xl">
                {{ heroSection?.title }}
            </h1>

            <div class="space-y-6 lg:pt-3">
                <p
                    v-for="description in heroSection?.description"
                    :key="description"
                    class="text-base"
                >
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadHeroSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading hero section for path ${path}:`, error);
        return null;
    }
};

// Async loading of hero sections for different locales
const [enHeroSection, arHeroSection, kuHeroSection, trHeroSection] =
    await Promise.all([
        loadHeroSection("/en/about/hero-section"),
        loadHeroSection("/ar/about/hero-section"),
        loadHeroSection("/ku/about/hero-section"),
        loadHeroSection("/tr/about/hero-section"),
    ]);

// Compute the current locale's hero section
const heroSection = computed(() => {
    const localeMap = {
        en: enHeroSection,
        ar: arHeroSection,
        ku: kuHeroSection,
        tr: trHeroSection,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
