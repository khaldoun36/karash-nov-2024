<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <div
            class="relative isolate flex aspect-[4/3] h-auto min-w-full flex-col items-start justify-center overflow-hidden p-8 lg:aspect-video lg:max-h-[480px]"
        >
            <NuxtImg
                src="/home/cta.jpg"
                class="absolute inset-0 h-full w-full rounded border border-white/10 object-cover brightness-50"
            />
            <h2
                class="relative max-w-[35ch] text-balance text-2xl md:text-4xl lg:text-5xl"
            >
                {{ contactSection?.title }}
            </h2>
            <NuxtLink
                :to="localePath('/')"
                class="btn relative mt-8"
                data-variant="primary"
            >
                {{ contactSection?.btn }}
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// Watch for locale changes and refetch header data
const { data: contactSection } = await useAsyncData(
    "contact-section",
    () =>
        queryContent(`/${currentLocale.value}/home/contact-section`).findOne(),
    {
        watch: [currentLocale],
    }
);
</script>

<style scoped></style>
