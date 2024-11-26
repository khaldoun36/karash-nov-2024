// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/i18n",
        "@nuxt/fonts",
        "@nuxt/image",
        "@nuxt/icon",
        "@vueuse/nuxt",
    ],

    routeRules: {
        "/": { prerender: true },
    },

    compatibilityDate: "2024-11-17",

    css: [
        "@/assets/css/typography.css",
        "@/assets/css/wrapper.css",
        "@/assets/css/button.css",
    ],

    // Internationalization Options Start
    i18n: {
        locales: [
            { code: "en", language: "en-US", name: "EN" },
            { code: "ar", language: "ar-AE", name: "AR" },
            { code: "ku", language: "ku-TR", name: "KU" },
            { code: "tr", language: "tr-TR", name: "TR" },
        ],
        strategy: "prefix_except_default",
        defaultLocale: "en",
    },
    // Internationalization Options end

    // Image options start
    image: {
        dir: "assets/images",
    },
    // Image options end
});
