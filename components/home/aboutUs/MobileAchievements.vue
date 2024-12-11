<template>
    <div
        class="achievements relative mt-10 grid grid-cols-2 grid-rows-2 md:mt-12 lg:mt-16 lg:hidden"
    >
        <div class="py-8 text-center" v-for="item in aboutSection?.statistics">
            <p class="text-4xl text-neutral-100">
                {{ item?.number }}
            </p>
            <h3 class="mt-3 text-sm text-neutral-300 md:text-base">
                {{ item?.title }}
            </h3>
        </div>
        <div class="h-line" aria-hidden="true" aria-label="decorative"></div>
        <div class="v-line" aria-hidden="true" aria-label="decorative"></div>
        <Icon
            name="ph:diamond-fill"
            aria-hidden="true"
            aria-label="decorative"
            size="30px"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-neutral-600"
        />
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

<style scoped>
.h-line,
.v-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Adjust for the element's own size */
    background-color: theme("colors.neutral.600");
}

.h-line {
    min-width: 100%;
    height: 1px;
}
.v-line {
    min-height: 100%;
    width: 1px;
}
</style>
