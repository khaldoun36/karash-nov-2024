<template>
    <section v-if="contactSection?.title" class="mt-20 md:mt-24 lg:mt-32">
        <div
            class="relative isolate flex aspect-[4/3] h-auto min-w-full flex-col items-center justify-center overflow-hidden p-8 lg:aspect-video lg:max-h-[480px]"
        >
            <NuxtImg
                src="v1733895556/cta_h2smjz.jpg"
                :alt="contactSection?.title"
                class="absolute inset-0 h-full w-full rounded border border-white/10 object-cover brightness-50"
                width="1250"
                height="699"
            />
            <h3
                class="relative max-w-[35ch] text-balance text-center text-base md:text-3xl lg:text-5xl"
            >
                {{ contactSection?.title }}
            </h3>
            <NuxtLink
                :to="localePath('/')"
                class="btn relative mt-8 md:!min-h-[3rem] md:!px-10 lg:!min-h-[3.5rem] lg:!px-12"
                data-variant="primary"
            >
                {{ contactSection?.btn }}
            </NuxtLink>
        </div>
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No contact section available
        </h2>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadContactSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading contact section for path ${path}:`, error);
        return null;
    }
};

// Async loading of contact sections for different locales
const [enContactSection, arContactSection, kuContactSection, trContactSection] =
    await Promise.all([
        loadContactSection("/en/home/contact-section"),
        loadContactSection("/ar/home/contact-section"),
        loadContactSection("/ku/home/contact-section"),
        loadContactSection("/tr/home/contact-section"),
    ]);

// Compute the current locale's contact section
const contactSection = computed(() => {
    const localeMap = {
        en: enContactSection,
        ar: arContactSection,
        ku: kuContactSection,
        tr: trContactSection,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
