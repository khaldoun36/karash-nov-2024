<template>
    <div
        class="relative mt-10 hidden justify-between border-y border-white/10 md:mt-12 lg:mt-16 lg:flex"
    >
        <div
            class="my-10 text-center first:text-start last:text-end md:my-12 lg:my-16"
            v-for="item in aboutSection?.statistics"
        >
            <p class="text-5xl font-extralight text-neutral-100">
                {{ item?.number }}
            </p>
            <h3 class="mt-8 text-base font-light text-neutral-400">
                {{ item?.title }}
            </h3>
        </div>
        <div
            class="absolute left-[20%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
        <div
            class="absolute left-[50%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
        <div
            class="absolute left-[80%] top-1/2 h-1/2 w-[1.5px] -translate-y-1/2 bg-white/10"
        ></div>
    </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Watch for locale changes and refetch header data
const { data: aboutSection } = await useAsyncData(
    "about-section",
    () => queryContent(`/${currentLocale.value}/home/about-section`).findOne(),
    {
        watch: [currentLocale],
    }
);
</script>

<style scoped></style>
