<template>
    <div class="wrapper">
        <NuxtPage />
    </div>

    <PrimaryFooter />
</template>

<script setup>
import PrimaryFooter from "./components/shared/PrimaryFooter.vue";

const { locale } = useI18n();
const currentLocale = locale.value;
</script>

<style>
html,
body,
#app {
    background-color: theme("colors.neutral.950");
}
</style>
