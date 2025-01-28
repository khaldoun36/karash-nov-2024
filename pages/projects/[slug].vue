<template>
    <Head>
        <Title>{{ article?.title }}</Title>
        <Meta name="description" :content="article?.description" />
        <Meta property="og:image" :content="article?.thumbnail" />
    </Head>
    <main
        v-if="article"
        class="relative mt-40 grid gap-10 md:mt-44 md:gap-12 lg:mt-52 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
    >
        <div class="self-start lg:sticky lg:top-20 lg:col-start-2">
            <h1
                class="max-w-[40ch] text-balance text-5xl md:text-7xl xl:text-7.5xl"
            >
                {{ article?.title }}
            </h1>
            <p
                v-for="item in article?.description"
                :key="item"
                class="mt-8 max-w-[45ch] text-balance text-base"
            >
                {{ item }}
            </p>
        </div>
        <div class="space-y-8 lg:row-start-1">
            <NuxtImg
                v-for="image in article?.images"
                :src="image.src"
                :key="image"
                :width="image.width / (width > 1500 ? 1 : 2)"
                :height="image.height / (width > 1500 ? 1 : 2)"
                :alt="`project image for ${article?.title}`"
                class="aspect-auto h-auto w-full overflow-hidden rounded border border-white/10 object-cover"
            />
        </div>
    </main>
    <div v-else>Loading...</div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const route = useRoute();

const { width, height } = useWindowSize();

// Centralized content loading function
const loadArticle = async (path) => {
    try {
        return await queryContent(path)
            .where({ path: route.params.slug })
            .findOne();
    } catch (error) {
        console.error(`Error loading article for path ${path}:`, error);
        return null;
    }
};

// Async loading of articles for different locales
const [enArticle, arArticle, kuArticle, trArticle] = await Promise.all([
    loadArticle("/en/projects"),
    loadArticle("/ar/projects"),
    loadArticle("/ku/projects"),
    loadArticle("/tr/projects"),
]);

// Compute the current locale's article
const article = computed(() => {
    const localeMap = {
        en: enArticle,
        ar: arArticle,
        ku: kuArticle,
        tr: trArticle,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
