<template>
    <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
        <Head>
            <Title>{{ seo?.title }}</Title>
            <Meta name="description" :content="seo?.description" />
            <Meta name="keywords" :content="seo?.keywords" />
        </Head>
        <MobileHeader v-if="width <= 1280" />
        <PrimaryHeader v-if="width >= 1280" />
        <div class="wrapper">
            <NuxtPage />
        </div>

        <PrimaryFooter />
    </Html>
</template>

<script setup>
import PrimaryHeader from "./components/shared/PrimaryHeader.vue";
import MobileHeader from "./components/shared/MobileHeader.vue";
import PrimaryFooter from "./components/shared/PrimaryFooter.vue";

const head = useLocaleHead({
    addDirAttribute: true, // Adds dir
    addSeoAttributes: true, // Adds lang
});

const htmlAttrs = computed(() => head.value.htmlAttrs);

const { width } = useWindowSize();
const { data: seo } = await useLocalizedContent("site-seo", "home/seo");
</script>

<style>
html,
body,
#app {
    background-color: var(--color-neutral-950);
}
</style>
