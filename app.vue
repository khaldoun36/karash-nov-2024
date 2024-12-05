<template>
    <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
        <PrimaryHeader />
        <div class="wrapper">
            <NuxtPage />
        </div>

        <PrimaryFooter />
    </Html>
</template>

<script setup>
import PrimaryHeader from "./components/shared/PrimaryHeader.vue";
import PrimaryFooter from "./components/shared/PrimaryFooter.vue";

const head = useLocaleHead({
    addDirAttribute: true, // Adds dir
    addSeoAttributes: true, // Adds lang
});

const htmlAttrs = computed(() => head.value.htmlAttrs);
</script>

<style>
html,
body,
#app {
    background-color: theme("colors.neutral.950");
}
</style>
