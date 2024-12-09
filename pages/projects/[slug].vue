<template>
    <Head>
        <Title>{{ article.title }}</Title>
        <Meta name="description" :content="article.description" />
        <Meta property="og:image" :content="article.thumbnail" />
    </Head>
    <main
        class="relative mt-40 grid gap-10 md:mt-44 md:gap-12 lg:mt-52 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
    >
        <div class="self-start lg:sticky lg:top-20 lg:col-start-2">
            <h1
                class="max-w-[40ch] text-balance text-4xl md:text-7xl lg:text-7.5xl"
            >
                {{ article.title }}
            </h1>
            <p
                v-for="item in article.description"
                :key="item"
                class="mt-8 max-w-[45ch] text-balance text-base md:text-lg"
            >
                {{ item }}
            </p>
        </div>
        <div class="space-y-8 lg:row-start-1">
            <NuxtImg
                v-for="image in article.images"
                :src="image"
                :key="image"
                width="1280"
                height="1706.67"
                class="aspect-[3/4] overflow-hidden rounded border border-white/10 object-cover"
            />
        </div>
    </main>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

const route = useRoute();

// Watch for locale changes and refetch article data
const { data: article } = await useAsyncData(
    "project-article",
    () =>
        queryContent(`/${currentLocale.value}/projects`)
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
