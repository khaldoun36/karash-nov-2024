<template>
    <div class="group grid gap-8">
        <NuxtLink
            :to="localePath(`/projects/${slug}`)"
            class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
        >
            <NuxtImg
                :src="thumbnail.src"
                :alt="title"
                :width="thumbnail.width"
                :height="thumbnail.height"
                fit="fill"
                class="aspect-4/3 h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
            />

            <div class="mt-5 flex min-h-full flex-col justify-between lg:mt-0">
                <div>
                    <h3
                        class="text-xl text-balance transition-opacity group-hover:opacity-80 md:text-3xl xl:text-4xl"
                        :class="{
                            'tracking-wide': locale === 'en' || locale === 'tr',
                        }"
                    >
                        {{ title }}
                    </h3>
                </div>
                <button
                    class="btn mt-8 hidden! self-end lg:flex!"
                    data-variant="primary"
                >
                    {{ readMoreText }}
                </button>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define TS interface for nested objects
interface Thumbnail {
    src: string;
    width?: number | string;
    height?: number | string;
}

// Vue 3.5+ reactive props destructuring
const { title, slug, thumbnail } = defineProps<{
    title: string;
    slug: string;
    thumbnail: Thumbnail;
}>();

// Composables
const { locale } = useI18n();
const localePath = useLocalePath();

// Cleaned up translation logic
const readMoreText = computed(() => {
    switch (locale.value) {
        case "ar":
            return "اقرأ المزيد";
        case "tr":
            return "Daha Fazla";
        case "ku":
            return "زیاتر بخوێنەوە";
        default:
            return "Read More";
    }
});
</script>
