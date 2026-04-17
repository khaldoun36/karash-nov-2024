<template>
    <section
        v-if="partnersSection?.title"
        class="mt-10 space-y-8 overflow-hidden md:mt-12 lg:mt-16"
    >
        <div class="mt-10 grid place-items-center text-center">
            <h3 class="text-xl text-neutral-400!">
                {{ partnersSection.title }}
            </h3>
        </div>
        <div
            class="marquee fadeout-horizontal"
            :style="{
                '--num-items': images.length,
                direction: 'ltr !important',
            }"
        >
            <ul class="marquee-track mx-auto">
                <li
                    class="marquee-item"
                    v-for="(image, index) in images"
                    :key="index"
                    :style="{ '--item-position': index + 1 }"
                >
                    <NuxtImg
                        provider="cloudinary"
                        :src="image.src"
                        :alt="`Partner ${index + 1}`"
                        class="media-images__image h-auto w-30 object-contain brightness-150! grayscale! lg:w-40"
                        :width="image.width"
                        :height="image.height"
                    />
                </li>
            </ul>
        </div>
    </section>

    <section v-else class="mt-10 space-y-8 overflow-hidden md:mt-12 lg:mt-16">
        <div class="mt-10 grid place-items-center text-center">
            <h2 class="text-xl text-neutral-400!">
                No partners section available
            </h2>
        </div>
    </section>
</template>

<script setup>
const images = [
    {
        src: "v1733903972/partners-image-11_ffsdlt.png",
        width: 523,
        height: 477,
    },
    { src: "v1733903970/partners-image-1_ex1h5d.png", width: 150, height: 47 },
    { src: "v1733903969/partners-image-3_v7lcaf.png", width: 143, height: 50 },
    {
        src: "v1733903968/partners-image-9_2_dlugrz.png",
        width: 159,
        height: 44,
    },
];

const { data: partnersSection } = await useLocalizedContent(
    "home-partners-section",
    "home/partners-section"
);
</script>

<style scoped>
.marquee {
    max-width: 90vw;
    overflow: hidden;
    --speed: 25s;

    /* Base width for small devices */
    --item-width: 120px;
    --item-gap: 80px;

    --single-slide-speed: calc(var(--speed) / var(--num-items));
    --item-width-plus-gap: calc(var(--item-width) + var(--item-gap));
    --track-width: calc(
        var(--item-width-plus-gap) * calc(var(--num-items) - 1)
    );

    margin-inline: auto;

    --mask-color: var(--color-zinc-100);
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
