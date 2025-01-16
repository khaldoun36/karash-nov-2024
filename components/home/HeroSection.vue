<template>
    <div
        v-if="heroSection?.title"
        class="full-width relative isolate mx-2 mt-2 h-[calc(100vh-10vh)] max-h-[800px] overflow-clip rounded border border-white/10 px-4"
    >
        <NuxtImg
            :src="image.path"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
            class="absolute inset-0 h-full w-full object-cover brightness-[40%]"
            preload
        />
        <main
            class="relative flex h-full flex-col items-center justify-center pt-10"
        >
            <h1
                class="mx-auto max-w-[40ch] text-balance text-center text-4xl md:text-7xl lg:text-7.5xl"
                :class="{
                    'md:!text-6xl lg:!text-6xl': isRTL,
                    '!max-w-[20ch]': locale === 'en',
                }"
            >
                {{ heroSection?.title }}
            </h1>
            <p
                class="mx-auto mt-8 max-w-prose text-balance text-center text-base md:text-lg"
            >
                {{ heroSection?.subTitle }}
            </p>
            <div class="mx-auto mt-10 flex gap-8">
                <NuxtLink
                    :to="localePath('/contact-us')"
                    class="btn"
                    data-variant="primary"
                >
                    {{ heroSection?.btnCta }}</NuxtLink
                >
                <NuxtLink
                    :to="localePath('/about-us')"
                    class="btn"
                    data-variant="secondary"
                >
                    {{ heroSection?.btnAboutUs }}</NuxtLink
                >
            </div>
        </main>
    </div>

    <div
        v-else
        class="full-width relative isolate mx-2 mt-2 h-[calc(100dvh-10dvh)] max-h-[800px] overflow-clip rounded border border-white/10"
    >
        <main
            class="relative flex h-full flex-col items-center justify-center pt-10"
        >
            <h1 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
                No hero section available
            </h1>
        </main>
    </div>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadHeroSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading hero section for path ${path}:`, error);
        return null;
    }
};

// Async loading of hero sections for different locales
const [enHeroSection, arHeroSection, kuHeroSection, trHeroSection] =
    await Promise.all([
        loadHeroSection("/en/home/hero-section"),
        loadHeroSection("/ar/home/hero-section"),
        loadHeroSection("/ku/home/hero-section"),
        loadHeroSection("/tr/home/hero-section"),
    ]);

// Compute the current locale's hero section
const heroSection = computed(() => {
    const localeMap = {
        en: enHeroSection,
        ar: arHeroSection,
        ku: kuHeroSection,
        tr: trHeroSection,
    };
    return localeMap[currentLocale.value] || null;
});

const image = {
    path: "v1733895556/hero-image_kcu933.jpg",
    alt: "The image shows a modern and minimalist living room interior. The room features a gray L-shaped sofa with various decorative pillows, a round black and white patterned ottoman, and a low wooden coffee table. The walls are painted in a light gray color, and there is a large wall clock with a simple black outline design. The lighting in the room is provided by a suspended linear light fixture with multiple bulbs. Overall, the space has a sophisticated and monochromatic color scheme with a focus on clean lines and minimalist design elements.",
    width: 2600,
    height: 1577,
};
</script>

<style scoped></style>
