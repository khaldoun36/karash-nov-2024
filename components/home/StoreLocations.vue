<template>
    <section class="breakout mt-20 md:mt-24 lg:mt-32" id="storeLocations">
        <h2 class="max-w-[35ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ storeLocations?.title }}
        </h2>
        <div class="embla mt-10 md:mt-12 lg:mt-16" ref="emblaRef">
            <div class="embla__container">
                <div
                    class="embla__slide group me-6 flex aspect-square h-auto min-w-72 flex-col justify-end rounded border border-white/10 bg-neutral-900 p-8 md:me-8"
                    v-for="location in storeLocations?.locations"
                    :key="location.numberLink"
                >
                    <h3>{{ location.city }}</h3>

                    <NuxtLink
                        :to="location.locationLink"
                        class="mt-8 text-balance transition-colors hover:text-neutral-600"
                    >
                        {{ location.location }}
                    </NuxtLink>

                    <NuxtLink
                        v-for="phone in location.phones"
                        :to="`tel:${phone.link}`"
                        class="ansition-colors mt-6 self-start hover:text-neutral-600"
                        style="direction: ltr !important"
                    >
                        {{ phone.number }}
                    </NuxtLink>
                </div>
            </div>
            <div
                class="mt-10 hidden items-center gap-8 pr-8 md:mt-12 lg:mt-16 lg:flex lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
            >
                <button
                    class="embla__prev flex size-12 items-center justify-center rounded-full bg-neutral-900"
                    @click="scrollPrev"
                    :class="{
                        'cursor-not-allowed opacity-50': !canScrollPrev,
                    }"
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
</template>

<script setup>
import emblaCarouselVue from "embla-carousel-vue";
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Check if current locale is RTL
const isRTL = computed(() => {
    return ["ar", "ku"].includes(currentLocale.value);
});

// Watch for locale changes and refetch header data
const { data: storeLocations } = await useAsyncData(
    "store-locations",
    () =>
        queryContent(`/${currentLocale.value}/home/store-locations`).findOne(),
    {
        watch: [currentLocale],
    }
);

// Embla Carousel Start
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const [emblaRef, emblaApi] = emblaCarouselVue({
    loop: false,
    align: "start",
    direction: isRTL.value ? "rtl" : "ltr",
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
// Embala Carousel end
</script>

<style scoped>
.embla {
    overflow: hidden;
}
.embla__container {
    display: flex;
}
</style>
