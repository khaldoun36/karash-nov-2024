<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[40ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ projectsSection?.title }}
        </h2>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;

const { data: projectsSection } = await useAsyncData("projects-section", () =>
    queryContent(`/${currentLocale}/home/projects-section`).findOne()
);
</script>

<style scoped></style>
