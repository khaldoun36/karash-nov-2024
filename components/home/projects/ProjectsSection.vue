<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[40ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ projectsSection?.title }}
        </h2>
        <div
            class="mt-5 grid gap-8 divide-y divide-white/10 md:mt-6 lg:mt-8 lg:gap-0"
        >
            <ContentList :path="`/${currentLocale}/projects`" v-slot="{ list }">
                <div
                    v-for="article in list.slice(0, 3)"
                    :key="article.path"
                    class="group"
                >
                    <NuxtLink
                        :to="localePath(`/projects/${article.path}`)"
                        class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
                    >
                        <NuxtImg
                            :src="article.thumbnail"
                            :alt="article.title"
                            width="4000"
                            height="3000"
                            class="aspect-[4/3] h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
                        />

                        <div
                            class="mt-5 flex min-h-full flex-col justify-between lg:mt-0"
                        >
                            <div>
                                <h3
                                    class="text-balance text-2xl transition-opacity group-hover:opacity-80"
                                >
                                    {{ article.title }}
                                </h3>
                                <p
                                    class="mt-3 text-base transition-opacity group-hover:opacity-80 md:text-lg"
                                >
                                    {{ article.seoDescription }}
                                </p>
                            </div>
                            <button
                                class="btn mt-8 !hidden self-end lg:!flex"
                                data-variant="primary"
                            >
                                Read More
                            </button>
                        </div>
                    </NuxtLink>
                </div>
            </ContentList>
        </div>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// Watch for locale changes and refetch header data
const { data: projectsSection } = await useAsyncData(
    "projects-section",
    () =>
        queryContent(`/${currentLocale.value}/home/projects-section`).findOne(),
    {
        watch: [currentLocale],
    }
);
</script>

<style scoped></style>
