<template>
    <section class="breakout mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[35ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ servicesSection?.title }}
        </h2>
        <div class="embla mt-10 md:mt-12 lg:mt-16" ref="emblaRef">
            <div class="embla__container">
                <NuxtLink
                    class="embla__slide group mr-6 flex flex-col md:mr-8"
                    v-for="service in servicesSection?.services"
                    :key="service.title"
                    :to="localePath(`/services/${service.linkPath}`)"
                >
                    <NuxtImg
                        :src="service?.imagePath"
                        class="aspect-square h-auto min-w-[calc(100vw-15vw)] overflow-clip rounded border border-white/10 brightness-90 md:min-w-[calc(100vw-40vw)] lg:min-w-[calc(1024px/2)] xl:min-w-[calc(1216px/2)] 2xl:min-w-[calc(1472px/2)]"
                    />
                    <div
                        class="mt-6 flex items-center gap-4 text-neutral-100 transition-all group-hover:gap-5 group-hover:text-neutral-400"
                    >
                        <Icon
                            name="heroicons:arrow-right-20-solid"
                            class="hidden md:block"
                            size="20px"
                        />
                        <h3
                            class="text-balance text-lg transition-colors group-hover:text-neutral-400 md:text-2xl"
                        >
                            {{ service?.title }}
                        </h3>
                    </div>
                </NuxtLink>
            </div>
            <div
                class="mt-10 hidden items-center gap-8 md:mt-12 lg:mt-16 lg:flex lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
            >
                <button
                    class="embla__prev flex size-12 items-center justify-center rounded-full bg-neutral-900"
                    @click="scrollPrev"
                    :class="{
                        'cursor-not-allowed opacity-50': !canScrollPrev,
                    }"
                >
                    <Icon name="heroicons:chevron-left-20-solid" size="28px" />
                </button>
                <button
                    class="embla__next flex size-12 items-center justify-center rounded-full bg-neutral-900"
                    @click="scrollNext"
                    :class="{
                        'cursor-not-allowed opacity-50': !canScrollNext,
                    }"
                >
                    <Icon name="heroicons:chevron-right-20-solid" size="28px" />
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import emblaCarouselVue from "embla-carousel-vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Watch for locale changes and refetch header data
const { data: servicesSection } = await useAsyncData(
    "services-section",
    () =>
        queryContent(`/${currentLocale.value}/home/services-section`).findOne(),
    {
        watch: [currentLocale],
    }
);

const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const [emblaRef, emblaApi] = emblaCarouselVue({
    loop: false,
    align: "start",
});

onMounted(() => {
    if (emblaApi.value) {
        // Update scroll state when the carousel changes
        emblaApi.value.on("select", () => {
            updateScrollState();
        });

        // Initial state check
        updateScrollState();
    }
});

const updateScrollState = () => {
    if (emblaApi.value) {
        canScrollPrev.value = emblaApi.value.canScrollPrev();
        canScrollNext.value = emblaApi.value.canScrollNext();
    }
};

const scrollPrev = () => {
    if (emblaApi.value && canScrollPrev.value) {
        emblaApi.value.scrollPrev();
    }
};

const scrollNext = () => {
    if (emblaApi.value && canScrollNext.value) {
        emblaApi.value.scrollNext();
    }
};
</script>

<style scoped>
.embla {
    overflow: hidden;
}
.embla__container {
    display: flex;
}
</style>
