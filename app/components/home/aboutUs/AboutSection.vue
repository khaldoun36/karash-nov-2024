<template>
    <section v-if="aboutSection?.title" class="mt-20 md:mt-24 lg:mt-32">
        <div class="xl:items-top xl:flex xl:gap-32">
            <h2 class="text-nowrap text-3xl md:text-5xl xl:-mt-1 xl:text-6xl">
                {{ aboutSection?.title }}
            </h2>
            <div class="mt-8 xl:mt-0 xl:flex xl:gap-8">
                <p
                    class="mt-4 max-w-prose text-base xl:mt-0 xl:flex-1"
                    v-for="text in aboutSection?.subTitle"
                >
                    {{ text }}
                </p>
            </div>
        </div>
        <PartnersSection />
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No about section available
        </h2>
    </section>
</template>

<script setup>
import PartnersSection from "~/components/home/PartnersSection.vue";

const { data: aboutSection } = await useLocalizedContent(
    "home-about-section",
    "home/about-section"
);
</script>

<style scoped></style>
