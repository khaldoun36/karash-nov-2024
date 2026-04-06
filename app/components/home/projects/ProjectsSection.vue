<template>
    <section v-if="projectsSection?.title" class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[40ch] text-3xl text-balance md:text-5xl lg:text-6xl">
            {{ projectsSection?.title }}
        </h2>
        <div
            class="mt-5 grid gap-8 divide-y divide-white/10 md:mt-6 lg:mt-8 lg:gap-0"
        >
            <div
                v-for="article in featuredProjects"
                :key="article.slug"
                class="group grid gap-8"
            >
                <NuxtLink
                    :to="localePath(`/projects/${article.slug}`)"
                    class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
                >
                    <NuxtImg
                        :src="article.thumbnail.src"
                        :alt="article.title"
                        :width="article.thumbnail.width"
                        :height="article.thumbnail.height"
                        fit="fill"
                        class="aspect-4/3 h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
                    />

                    <div
                        class="mt-5 flex min-h-full flex-col justify-between lg:mt-0"
                    >
                        <div>
                            <h3
                                class="text-xl text-balance transition-opacity group-hover:opacity-80 md:text-3xl xl:text-4xl"
                                :class="{
                                    'tracking-wide':
                                        locale === 'en' || locale === 'tr',
                                }"
                            >
                                {{ article.title }}
                            </h3>
                        </div>
                        <button
                            class="btn mt-8 hidden! self-end lg:flex!"
                            data-variant="primary"
                        >
                            {{
                                currentLocale === "ar"
                                    ? "اقرأ المزيد"
                                    : currentLocale === "tr"
                                      ? "Daha Fazla"
                                      : currentLocale === "ku"
                                        ? "زیاتر بخوێنەوە"
                                        : "Read More"
                            }}
                        </button>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl text-neutral-400 md:text-4xl lg:text-5xl">
            No projects section available
        </h2>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

const { data: projectsSection } = await useLocalizedContent(
    "home-projects-section",
    "home/projects-section"
);
const { data: projectEntries } = await useLocalizedCollectionItems(
    "home-project-list",
    "projects"
);

const featuredProjects = computed(() =>
    sortContentItemsByStem(
        (projectEntries.value ?? []).filter(
            (article) => article.slug && article.thumbnail
        )
    ).slice(0, 3)
);
</script>

<style scoped></style>
