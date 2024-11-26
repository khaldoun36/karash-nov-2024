<template>
    <section
        class="full-width relative isolate mx-auto mt-20 aspect-video max-h-[800px] w-[calc(100%-1rem)] place-content-center overflow-hidden rounded md:mt-24 lg:mt-32"
    >
        <NuxtImg
            src="/home/latest-news.png"
            class="absolute inset-0 h-full min-w-full border border-white/10 object-cover brightness-[65%]"
        />

        <div class="wrapper">
            <h2
                class="relative max-w-prose text-balance text-sm md:text-2xl lg:text-4.5xl"
            >
                {{ latestNews?.title }}
            </h2>
        </div>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;

const { data: latestNews } = await useAsyncData("latest-news", () =>
    queryContent(`/${currentLocale}/home/latest-news`).findOne()
);
</script>

<style scoped></style>
