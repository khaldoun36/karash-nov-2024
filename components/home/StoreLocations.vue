<template>
    <section
        v-if="storeLocations?.locations?.length"
        class="breakout mt-20 md:mt-24 lg:mt-32"
        id="storeLocations"
    >
        <h2 class="max-w-[35ch] text-balance text-3xl md:text-5xl lg:text-6xl">
            {{ storeLocations?.title }}
        </h2>

        <div class="embla mt-10 md:mt-12 lg:mt-16" ref="emblaRef">
            <div class="embla__container">
                <div
                    class="embla__slide group me-6 flex aspect-square h-auto min-w-72 flex-col justify-end rounded border border-white/10 bg-neutral-900 p-8 md:me-8"
                    v-for="location in storeLocations?.locations"
                    :key="location.numberLink"
                >
                    <h3
                        class="text-2xl"
                        :class="{
                            'tracking-wide': locale === 'en' || locale === 'tr',
                        }"
                    >
                        {{ location.city }}
                    </h3>

                    <NuxtLink
                        :to="location.locationLink"
                        class="mt-8 text-balance text-sm transition-colors hover:text-neutral-600"
                    >
                        {{ location.location }}
                    </NuxtLink>

                    <div class="mt-6 flex flex-col space-y-2">
                        <NuxtLink
                            v-for="phone in location.phones"
                            :key="phone.link"
                            :to="`tel:${phone.link}`"
                            class="self-start text-sm transition-colors hover:text-neutral-600"
                            style="direction: ltr !important"
                        >
                            {{ phone.number }}
                        </NuxtLink>
                    </div>
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
            No store locations available
        </h2>
    </section>
</template>

<script setup>
import emblaCarouselVue from "embla-carousel-vue";
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadStoreLocations = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading store locations for path ${path}:`, error);
        return null;
    }
};

// Async loading of store locations for different locales
const [enStoreLocations, arStoreLocations, kuStoreLocations, trStoreLocations] =
    await Promise.all([
        loadStoreLocations("/en/home/store-locations"),
        loadStoreLocations("/ar/home/store-locations"),
        loadStoreLocations("/ku/home/store-locations"),
        loadStoreLocations("/tr/home/store-locations"),
    ]);

// Compute the current locale's store locations
const storeLocations = computed(() => {
    const localeMap = {
        en: enStoreLocations,
        ar: arStoreLocations,
        ku: kuStoreLocations,
        tr: trStoreLocations,
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
