<template>
    <div class="wrapper">
        <NuxtPage />
    </div>
</template>

<script setup>
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
