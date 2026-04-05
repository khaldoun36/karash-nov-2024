<template>
    <div class="mt-20 md:mt-24 lg:mt-32">
        <div class="grid items-start gap-8 lg:grid-cols-2">
            <h1 class="text-5xl md:text-7xl xl:text-7.5xl">
                {{ heroSection?.title }}
            </h1>

            <div class="space-y-6 lg:pt-3">
                <p
                    v-for="description in heroSection?.description"
                    :key="description"
                    class="text-base"
                >
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { data: heroSection } = await useLocalizedContent(
    "about-hero-section",
    "about/hero-section"
);
</script>

<style scoped></style>
