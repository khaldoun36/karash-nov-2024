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
            <!-- Use template v-for for better performance -->
            <template v-for="image in article?.images" :key="image.src">
                <div
                    class="relative w-full overflow-hidden rounded border border-white/10"
                    :style="{
                        aspectRatio: `${image.width} / ${image.height}`,
                    }"
                >
                    <!-- Add loading skeleton -->
                    <div
                        v-show="!imageLoaded[image.src]"
                        class="absolute inset-0 animate-pulse bg-gray-700"
                    />

                    <NuxtImg
                        :src="image.src"
                        :width="image.width / (image.width > 1500 ? 2 : 1)"
                        :height="image.height / (image.width > 1500 ? 2 : 1)"
                        :alt="`project image for ${article?.title}`"
                        class="h-auto w-full object-cover transition-opacity duration-300"
                        :class="{ 'opacity-0': !imageLoaded[image.src] }"
                        @load="imageLoaded[image.src] = true"
                        loading="lazy"
                    />
                </div>
            </template>
        </div>
    </main>
    <div v-else class="flex h-96 items-center justify-center">
        <div
            class="border-4 border-primary h-12 w-12 animate-spin rounded-full border-t-transparent"
        ></div>
    </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const route = useRoute();
const { width, height } = useWindowSize();

// Track loaded state for each image
const imageLoaded = ref({});

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

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
