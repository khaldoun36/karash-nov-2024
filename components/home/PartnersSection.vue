<template>
    <section
        v-if="partnersSection?.title"
        class="mt-10 space-y-8 overflow-hidden md:mt-12 lg:mt-16"
    >
        <div class="mt-10 grid place-items-center text-center">
            <h2 class="text-xl !text-neutral-400">
                {{ partnersSection?.title }}
            </h2>
        </div>
        <div
            ref="marqueeRef"
            class="marquee fadeout-horizontal"
            :class="{ rtl: isRTL }"
            :style="{ '--num-items': cleanedImagesPath.length }"
        >
            <ul class="marquee-track mx-auto">
                <li
                    class="marquee-item"
                    v-for="(path, index) in cleanedImagesPath"
                    :key="index"
                    :style="{ '--item-position': index + 1 }"
                >
                    <NuxtImg
                        :src="path"
                        :alt="`Partner ${index + 1}`"
                        class="media-images__image h-auto w-16 object-contain !brightness-150 !grayscale"
                        @load="adjustImageWidth"
                        width="400"
                        height="400"
                    />
                </li>
            </ul>
        </div>
    </section>

    <section v-else class="mt-10 space-y-8 overflow-hidden md:mt-12 lg:mt-16">
        <div class="mt-10 grid place-items-center text-center">
            <h2 class="text-xl !text-neutral-400">
                No partners section available
            </h2>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

const images = import.meta.glob("~/public/agency-logos/*.png");
const imagesPath = Object.keys(images);

console.log(images);

function removePublicFromPaths(paths) {
    return paths.map((path) => path.replace("/public", ""));
}

const cleanedImagesPath = removePublicFromPaths(imagesPath);

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadPartnersSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(
            `Error loading partners section for path ${path}:`,
            error
        );
        return null;
    }
};

// Async loading of partners sections for different locales
const [
    enPartnersSection,
    arPartnersSection,
    kuPartnersSection,
    trPartnersSection,
] = await Promise.all([
    loadPartnersSection("/en/home/partners-section"),
    loadPartnersSection("/ar/home/partners-section"),
    loadPartnersSection("/ku/home/partners-section"),
    loadPartnersSection("/tr/home/partners-section"),
]);

// Compute the current locale's partners section
const partnersSection = computed(() => {
    const localeMap = {
        en: enPartnersSection,
        ar: arPartnersSection,
        ku: kuPartnersSection,
        tr: trPartnersSection,
    };
    return localeMap[currentLocale.value] || null;
});

function adjustImageWidth(event) {
    const image = event.target;
    if (image && image.naturalWidth && image.naturalHeight) {
        const widthBase = 80;
        const scaleFactor = 0.525;
        const imageRatio = image.naturalWidth / image.naturalHeight;

        image.style.width = `${Math.pow(imageRatio, scaleFactor) * widthBase}px`;
    }
}

const marqueeRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
    const images = document.querySelectorAll(".media-images__image");
    images.forEach((image) => {
        if (image.complete && image.naturalWidth !== 0) {
            adjustImageWidth({ target: image });
        } else {
            image.addEventListener("load", adjustImageWidth);
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    if (marqueeRef.value) {
        observer.observe(marqueeRef.value);
    }
});
</script>

<style scoped>
.marquee {
    max-width: 90vw;
    overflow: hidden;
    --speed: 25s;
    --item-width: 160px;
    --item-gap: 80px;

    --single-slide-speed: calc(var(--speed) / var(--num-items));
    --item-width-plus-gap: calc(var(--item-width) + var(--item-gap));
    --track-width: calc(
        var(--item-width-plus-gap) * calc(var(--num-items) - 1)
    );

    margin-inline: auto;

    --mask-color: theme("colors.zinc.100");
    mask: linear-gradient(
        90deg,
        transparent,
        var(--mask-color, #333) 20%,
        var(--mask-color, #333) 80%,
        transparent
    );
}

.marquee-track {
    container-type: inline-size;
    display: grid;
    grid-template-columns: var(--track-width) [track] 0px [resting];
    width: max-content;
    overflow: hidden;
}

.marquee-item {
    width: var(--item-width);
    height: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    grid-area: resting;
    animation: marquee-move var(--speed) linear infinite
        var(--direction, forwards);
    animation-delay: calc(
        var(--single-slide-speed) * var(--item-position) * -1
    );
}

@keyframes marquee-move {
    to {
        transform: translateX(calc(-100cqw - 100%));
    }
}

.rtl .marquee-item {
    animation-direction: reverse;
}
</style>
