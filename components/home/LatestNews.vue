<template>
    <section
        v-if="latestNews?.title"
        class="full-width relative isolate mx-auto mt-20 aspect-[4/3] max-h-[800px] w-[calc(100%-1rem)] place-content-end overflow-hidden rounded md:mt-24 md:aspect-video lg:mt-32 xl:place-content-center"
    >
        <NuxtImg
            src="v1733895559/latest-news_eei5vr.png"
            class="absolute inset-0 h-full min-w-full border border-white/10 object-cover brightness-[65%]"
            :alt="latestNews?.title"
            width="1424"
            height="800"
        />

        <div class="wrapper">
            <h3
                class="relative max-w-prose text-balance pb-10 text-base md:pb-12 md:text-3xl lg:text-5xl xl:pt-32"
            >
                {{ latestNews?.title }}
            </h3>
        </div>
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No latest news available
        </h2>
    </section>
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
const loadLatestNews = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading latest news for path ${path}:`, error);
        return null;
    }
};

// Async loading of latest news for different locales
const [enLatestNews, arLatestNews, kuLatestNews, trLatestNews] =
    await Promise.all([
        loadLatestNews("/en/home/latest-news"),
        loadLatestNews("/ar/home/latest-news"),
        loadLatestNews("/ku/home/latest-news"),
        loadLatestNews("/tr/home/latest-news"),
    ]);

// Compute the current locale's latest news
const latestNews = computed(() => {
    const localeMap = {
        en: enLatestNews,
        ar: arLatestNews,
        ku: kuLatestNews,
        tr: trLatestNews,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
