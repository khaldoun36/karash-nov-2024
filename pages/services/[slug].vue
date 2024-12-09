<template>
    <Head>
        <Title>{{ article?.title }}</Title>
        <Meta name="description" :content="article?.description" />
        <Meta property="og:image" :content="article?.images?.[0]" />
    </Head>
    <main
        class="relative mt-40 grid gap-10 md:mt-44 md:gap-12 lg:mt-52 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
        v-if="article"
    >
        <div class="self-start lg:sticky lg:top-20 lg:col-start-2">
            <h1
                class="max-w-[40ch] text-balance text-4xl md:text-7xl lg:text-7.5xl"
            >
                {{ article?.title }}
            </h1>
            <p class="mt-8 max-w-[45ch] text-balance text-base md:text-lg">
                {{ article?.description }}
            </p>
        </div>
        <div class="space-y-8 lg:row-start-1">
            <NuxtImg
                v-for="(image, index) in article.images"
                :src="image"
                :key="index"
                width="1280"
                height="1706.67"
                class="aspect-[3/4] overflow-clip rounded border border-white/10 object-cover"
            />
        </div>
    </main>
    <div v-else>Loading... {{ error }}</div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const route = useRoute();

const { data: article } = await useAsyncData(
    "services-article",
    () =>
        queryContent(`/${currentLocale.value}/services`)
            .where({ path: route.params.slug })
            .findOne(),
    {
        watch: [currentLocale],
        cache: true, // Enable caching of results
        lazy: true,
    }
);
</script>

<style scoped></style>
