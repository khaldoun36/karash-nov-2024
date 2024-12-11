<template>
    <div
        class="relative mt-10 hidden justify-between border-y border-white/10 md:mt-12 lg:mt-16 lg:flex"
    >
        <div
            class="my-10 text-center first:text-start last:text-end md:my-12 lg:my-16"
            v-for="item in aboutSection?.statistics"
        >
            <p class="text-5xl font-extralight text-neutral-100">
                {{ item?.number }}
            </p>
            <h3 class="mt-8 text-base font-light text-neutral-400">
                {{ item?.title }}
            </h3>
        </div>
        <div
            class="absolute left-[20%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
        <div
            class="absolute left-[50%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
        <div
            class="absolute left-[80%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
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
