<template>
    <img
        :src="logoSrc"
        alt="primary_logo"
        class="inline-block h-18 w-auto"
    />
</template>

<script setup>
import { computed } from "vue";
const { locale } = useI18n();

const logoSrc = computed(() => {
    if (locale.value === "ar" || locale.value === "ku") {
        return "/logo_kr.svg";
    }
    // Default for 'en', 'tr', or any other locale
    return "/logo_en.svg";
});
</script>
