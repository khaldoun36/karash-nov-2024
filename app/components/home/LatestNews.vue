<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <div
            class="aspect-video overflow-hidden rounded border border-white/10 bg-black"
        >
            <video
                ref="videoRef"
                class="size-full object-cover"
                controls
                loop
                muted
                playsinline
                preload="none"
            >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </section>
</template>

<script setup lang="ts">
const videoRef = ref<HTMLVideoElement | null>(null);

let observer: IntersectionObserver | null = null;

const playVideo = async () => {
    if (!videoRef.value) {
        return;
    }

    try {
        await videoRef.value.play();
    } catch {
        // Keep the player silent when autoplay is blocked unexpectedly.
    }
};

const pauseVideo = () => {
    videoRef.value?.pause();
};

onMounted(() => {
    if (!videoRef.value) {
        return;
    }

    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry?.isIntersecting) {
                void playVideo();
                return;
            }

            pauseVideo();
        },
        {
            threshold: 0.35,
        }
    );

    observer.observe(videoRef.value);
});

onBeforeUnmount(() => {
    observer?.disconnect();
    pauseVideo();
});
</script>
