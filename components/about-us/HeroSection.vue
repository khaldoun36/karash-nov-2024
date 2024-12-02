<template>
    <div class="mt-20 md:mt-24 lg:mt-32">
        <div class="grid items-start gap-8 lg:grid-cols-2">
            <h1 class="text-3xl md:text-4xl lg:text-5xl">
                {{ heroSection?.title }}
            </h1>

            <div class="space-y-6 lg:pt-3">
                <p
                    v-for="description in heroSection?.description"
                    :key="description"
                    class="text-base md:text-lg"
                >
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;

const { data: heroSection } = await useAsyncData("hero-section", () =>
    queryContent(`/${currentLocale}/about/hero-section`).findOne()
);
</script>

<style scoped></style>
