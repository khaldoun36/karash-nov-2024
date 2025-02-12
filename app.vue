<template>
    <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
        <Head>
            <Title>{{ seo.title }}</Title>
            <Meta name="description" :content="seo.description" />
            <Meta name="keywords" :content="seo.keywords" />
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
/*
<link
                rel="preload"
                as="image"
                href="https://res.cloudinary.com/dg9ajpzkv/image/upload/v1733895556/hero-image_kcu933.jpg"
            />
*/
import PrimaryHeader from "./components/shared/PrimaryHeader.vue";
import MobileHeader from "./components/shared/MobileHeader.vue";
import PrimaryFooter from "./components/shared/PrimaryFooter.vue";

const head = useLocaleHead({
    addDirAttribute: true, // Adds dir
    addSeoAttributes: true, // Adds lang
});

const htmlAttrs = computed(() => head.value.htmlAttrs);

const { width } = useWindowSize();
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

const { data: seo } = await useAsyncData(
    "seo",
    () => queryContent(`/${currentLocale.value}/home/seo`).findOne(),
    {
        watch: [currentLocale],
        cache: true, // Enable caching of results
        lazy: true,
    }
);
</script>

<style>
html,
body,
#app {
    background-color: theme("colors.neutral.950");
}
</style>
