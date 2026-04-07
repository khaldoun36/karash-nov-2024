<template>
    <section v-if="contactSection?.title" class="mt-20 md:mt-24 lg:mt-32">
        <div
            class="relative isolate flex aspect-4/3 h-auto min-w-full flex-col items-center justify-center overflow-hidden p-8 lg:aspect-video lg:max-h-120"
        >
            <NuxtImg
                provider="cloudinary"
                src="v1733895556/cta_h2smjz.jpg"
                :alt="contactSection?.title"
                class="absolute inset-0 h-full w-full rounded border border-white/10 object-cover brightness-50"
                width="1250"
                height="699"
            />
            <h3
                class="relative max-w-[35ch] text-center text-base text-balance md:text-3xl lg:text-5xl"
            >
                {{ contactSection?.title }}
            </h3>
            <NuxtLink
                :to="localePath('/')"
                class="btn relative mt-8 md:min-h-12! md:px-10! lg:min-h-14! lg:px-12!"
                data-variant="primary"
            >
                {{ contactSection?.btn }}
            </NuxtLink>
        </div>
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No contact section available
        </h2>
    </section>
</template>

<script setup>
const localePath = useLocalePath();
const { data: contactSection } = await useLocalizedContent(
    "home-contact-section",
    "home/contact-section"
);
</script>

<style scoped></style>
