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
const { data: latestNews } = await useLocalizedContent(
    "home-latest-news",
    "home/latest-news"
);
</script>

<style scoped></style>
