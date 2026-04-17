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
            <h1 class="lg:text-7.5xl max-w-[40ch] text-5xl md:text-7xl">
                {{ article?.title }}
            </h1>
            <p class="mt-8 max-w-[45ch] text-base text-balance">
                {{ article?.description }}
            </p>
        </div>
        <div class="space-y-8 lg:row-start-1">
            <NuxtImg
                v-for="(image, index) in article.images"
                :src="image"
                :key="index"
                provider="cloudinary"
                fit="fill"
                :modifiers="{ gravity: 'center' }"
                width="2048"
                height="2048"
                class="aspect-square overflow-clip rounded border border-white/10 object-cover"
            />
        </div>
    </main>
    <div v-else>Loading... {{ error }}</div>
</template>

<script setup>
const route = useRoute();
const currentSlug = computed(() => route.params.slug?.toString());
const { data: article } = await useLocalizedContentBySlug(
    "service-article",
    "services",
    currentSlug
);
</script>

<style scoped></style>
