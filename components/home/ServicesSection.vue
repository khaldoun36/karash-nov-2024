<template>
    <section
        v-if="servicesSection?.services?.length"
        class="breakout mt-20 md:mt-24 lg:mt-32"
    >
        <h2 class="max-w-[35ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ servicesSection?.title }}
        </h2>

        <div class="embla mt-10 md:mt-12 lg:mt-16" ref="emblaRef">
            <div class="embla__container">
                <NuxtLink
                    class="embla__slide group me-6 flex flex-col md:me-8"
                    v-for="service in servicesSection?.services"
                    :key="service.title"
                    :to="localePath(`/services/${service.linkPath}`)"
                    :aria-label="`View ${service.title} service`"
                >
                    <NuxtImg
                        :src="service?.imagePath"
                        :alt="service?.title"
                        class="aspect-square h-auto min-w-[calc(100vw-15vw)] overflow-clip rounded border border-white/10 object-cover brightness-90 md:min-w-[calc(100vw-40vw)] lg:min-w-[calc(1024px/2)] xl:min-w-[calc(1216px/2)] 2xl:min-w-[calc(1472px/2)]"
                        width="1600"
                        height="1600"
                        fit="fill"
                    />
                    <div
                        class="mt-6 flex items-center gap-4 text-neutral-100 transition-all group-hover:gap-5 group-hover:text-neutral-400"
                    >
                        <Icon
                            :name="
                                isRTL
                                    ? 'heroicons:arrow-left-20-solid'
                                    : 'heroicons:arrow-right-20-solid'
                            "
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
                    :aria-label="isRTL ? 'Next slide' : 'Previous slide'"
                    :aria-disabled="!canScrollPrev"
                >
                    <Icon
                        :name="
                            isRTL
                                ? 'heroicons:chevron-right-20-solid'
                                : 'heroicons:chevron-left-20-solid'
                        "
                        size="28px"
                    />
                </button>
                <button
                    class="embla__next flex size-12 items-center justify-center rounded-full bg-neutral-900"
                    @click="scrollNext"
                    :class="{
                        'cursor-not-allowed opacity-50': !canScrollNext,
                    }"
                    :aria-label="isRTL ? 'Previous slide' : 'Next slide'"
                    :aria-disabled="!canScrollNext"
                >
                    <Icon
                        :name="
                            isRTL
                                ? 'heroicons:chevron-left-20-solid'
                                : 'heroicons:chevron-right-20-solid'
                        "
                        size="28px"
                    />
                </button>
            </div>
        </div>
    </section>

    <section v-else class="breakout mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No services available
        </h2>
    </section>
</template>

<script setup>
import emblaCarouselVue from "embla-carousel-vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadServicesSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(
            `Error loading services section for path ${path}:`,
            error
        );
        return null;
    }
};

// Async loading of services sections for different locales
const [
    enServicesSection,
    arServicesSection,
    kuServicesSection,
    trServicesSection,
] = await Promise.all([
    loadServicesSection("/en/home/services-section"),
    loadServicesSection("/ar/home/services-section"),
    loadServicesSection("/ku/home/services-section"),
    loadServicesSection("/tr/home/services-section"),
]);

// Compute the current locale's services section
const servicesSection = computed(() => {
    const localeMap = {
        en: enServicesSection,
        ar: arServicesSection,
        ku: kuServicesSection,
        tr: trServicesSection,
    };
    return localeMap[currentLocale.value] || null;
});

// Carousel state and navigation
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const [emblaRef, emblaApi] = emblaCarouselVue({
    loop: false,
    align: "start",
    direction: isRTL.value ? "rtl" : "ltr",
    slidesToScroll: 1,
    skipSnaps: true,
});

onMounted(() => {
    if (emblaApi.value) {
        emblaApi.value.on("select", updateScrollState);
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
