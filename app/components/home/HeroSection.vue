<template>
    <div
        v-if="heroSection?.title"
        class="full-width relative isolate mx-2 mt-2 h-[calc(100vh-10vh)] max-h-200 overflow-clip rounded border border-white/10 px-4"
    >
        <NuxtImg
            preload
            :src="image.path"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
            class="absolute inset-0 h-full w-full object-cover brightness-40"
        />
        <main
            class="relative flex h-full flex-col items-center justify-center pt-10"
        >
            <h1
                class="xl:text-7.5xl mx-auto max-w-6xl text-center text-5xl md:text-7xl"
            >
                {{ heroSection?.title }}
            </h1>
            <p class="mx-auto mt-8 max-w-2xl text-center text-base text-pretty">
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
        class="full-width relative isolate mx-2 mt-2 h-[calc(100dvh-10dvh)] max-h-200 overflow-clip rounded border border-white/10"
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
const { data: heroSection } = await useLocalizedContent(
    "home-hero-section",
    "home/hero-section"
);

const image = {
    path: "v1733895556/hero-image_kcu933.jpg",
    alt: "The image shows a modern and minimalist living room interior. The room features a gray L-shaped sofa with various decorative pillows, a round black and white patterned ottoman, and a low wooden coffee table. The walls are painted in a light gray color, and there is a large wall clock with a simple black outline design. The lighting in the room is provided by a suspended linear light fixture with multiple bulbs. Overall, the space has a sophisticated and monochromatic color scheme with a focus on clean lines and minimalist design elements.",
    width: 2600,
    height: 1577,
};
</script>

<style scoped></style>
