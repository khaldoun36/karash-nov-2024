import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        "@nuxt/content",
        "@nuxtjs/i18n",
        "@nuxt/image",
        "@nuxt/icon",
        "@vueuse/nuxt",
    ],

    routeRules: {
        "/": { prerender: true },
    },

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                "@vue/devtools-core",
                "@vue/devtools-kit",
                "radix-vue",
                "embla-carousel-vue",
            ],
        },
    },

    compatibilityDate: "2024-11-17",

    css: [
        "@/assets/css/main.css",
        "@/assets/css/typography.css",
        "@/assets/css/wrapper.css",
        "@/assets/css/button.css",
    ],

    // Internationalization Options Start
    i18n: {
        locales: [
            { code: "en", language: "en-US", name: "EN", dir: "ltr" },
            { code: "ar", language: "ar-AE", name: "AR", dir: "rtl" },
            { code: "ku", language: "ku-TR", name: "KU", dir: "rtl" },
            { code: "tr", language: "tr-TR", name: "TR", dir: "ltr" },
        ],
        strategy: "prefix_except_default",
        defaultLocale: "en",
        baseUrl: "https://karash-nov-2024.vercel.app/",
    },
    // Internationalization Options end

    // Image options start
    // image: {
    //     provider: "cloudinary",
    //     cloudinary: {
    //         baseURL: "https://res.cloudinary.com/dg9ajpzkv/image/upload/",
    //     },
    //     format: ["avif", "webp"],
    //     quality: 80,
    // },
    // Image options end

    content: {
        experimental: {
            nativeSqlite: true,
        },
    },

    //  hosting on vercel
    // nitro: {
    //     static: true,
    // },
});
