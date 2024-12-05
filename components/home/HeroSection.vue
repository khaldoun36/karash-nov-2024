<template>
    <div
        class="full-width relative isolate mx-2 mt-2 h-[calc(100dvh-10dvh)] max-h-[800px] overflow-clip rounded border border-white/10"
    >
        <NuxtImg
            :src="image.path"
            :alt="image.alt"
            width="1424"
            height="800"
            class="absolute inset-0 h-full w-full object-cover brightness-[40%]"
        />
        <main
            class="relative flex h-full flex-col items-center justify-center pt-10"
        >
            <h1
                class="mx-auto max-w-[20ch] text-balance text-center text-4xl md:text-7xl lg:text-7.5xl"
            >
                {{ heroSection?.title }}
            </h1>
            <p
                class="mx-auto mt-8 max-w-[45ch] text-balance text-center text-base md:text-lg"
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
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Watch for locale changes and refetch header data
const { data: heroSection } = await useAsyncData(
    "hero-section",
    () => queryContent(`/${currentLocale.value}/home/hero-section`).findOne(),
    {
        watch: [currentLocale],
    }
);

const image = {
    path: "/home/hero-image.jpg",
    alt: "The image shows a modern and minimalist living room interior. The room features a gray L-shaped sofa with various decorative pillows, a round black and white patterned ottoman, and a low wooden coffee table. The walls are painted in a light gray color, and there is a large wall clock with a simple black outline design. The lighting in the room is provided by a suspended linear light fixture with multiple bulbs. Overall, the space has a sophisticated and monochromatic color scheme with a focus on clean lines and minimalist design elements.",
};
</script>

<style scoped></style>
