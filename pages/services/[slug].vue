<template>
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
    </main>
    <div v-else>Loading... {{ error }}</div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

const { data: article, error } = await useAsyncData(
    "services-article",
    () =>
        queryContent(`/${currentLocale.value}/services`)
            .where({ path: route.params.slug })
            .findOne(),
    {
        watch: [currentLocale],
    }
);

if (error.value) {
    console.error("Failed to fetch article:", error.value);
    // Handle error, maybe redirect or show an error page
}
// useSeoMeta({
//     title: article.value?.title || "Default Title",
//     description: article.value?.description || "Default Description",
//     ogImage: article.value?.images?.[0] || "default-image.jpg",
// });
</script>

<style scoped></style>
