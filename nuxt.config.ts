import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // --- Core Configuration ---
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    // Global CSS imports
    css: [
        "@/assets/css/main.css",
        "@/assets/css/typography.css",
        "@/assets/css/wrapper.css",
        "@/assets/css/button.css",
    ],

    // Route rendering rules (prerender all routes by default)
    routeRules: {
        "/**": { prerender: true },
    },

    // --- Modules ---
    modules: [
        "@nuxt/content",
        "@nuxtjs/i18n",
        "@nuxt/image",
        "@nuxt/icon",
        "@vueuse/nuxt",
    ],

    // --- Module Configurations ---

    // Vite & Build Options
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            // Pre-bundle specific dependencies to speed up the dev server
            include: [
                "@vue/devtools-core",
                "@vue/devtools-kit",
                "radix-vue",
                "embla-carousel-vue",
            ],
        },
    },

    // Nuxt Icon Options
    icon: {
        // Statically bundle icons to avoid runtime lookups during SSG
        provider: "none",
        clientBundle: {
            scan: true,
            icons: [
                "heroicons:arrow-left-20-solid",
                "heroicons:arrow-right-20-solid",
                "heroicons:chevron-down-20-solid",
                "heroicons:chevron-left-20-solid",
                "heroicons:chevron-right-20-solid",
                "ph:diamond-fill",
                "ph:facebook-logo",
                "ph:instagram-logo",
                "ph:linkedin-logo-light",
            ],
        },
    },

    // Nuxt i18n (Internationalization)
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

    // Nuxt Image Options
    image: {
        format: ["avif", "webp"], // Prioritize highly compressed modern formats
        quality: 80,
        densities: [1, 2], // Support retina displays without excessive loading
        screens: {
            // Breakpoints aligned with your Tailwind setup
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
        },
        cloudinary: {
            baseURL: "https://res.cloudinary.com/dg9ajpzkv/image/upload/",
        },
    },

    // Nuxt Content Options
    content: {
        experimental: {
            // Utilize SQLite for improved parsing and performance
            nativeSqlite: true,
        },
    },

    // Nitro (Server Engine) Options
    nitro: {
        prerender: {
            crawlLinks: true, // Automatically discover and prerender linked pages
            // Manually specify entry routes to ensure all locales are generated
            routes: ["/", "/ar", "/ku", "/tr"],
        },
    },
});
