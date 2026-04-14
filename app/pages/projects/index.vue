<template>
    <Head>
        <Title>{{ pageTitle }}</Title>
    </Head>
    <main class="mt-40 md:mt-44 lg:mt-52">
        <h1
            class="xl:text-7.5xl mx-auto max-w-[20ch] text-center text-5xl text-balance md:text-7xl"
        >
            {{ projectsHeroSection?.title }}
        </h1>
    </main>
    <section class="mt-20 divide-y divide-white/10 md:mt-24 lg:mt-32">
        <div
            v-if="activeCategory"
            class="mb-8 text-sm tracking-[0.18em] text-neutral-400"
        >
            {{ activeCategoryLabel }}
        </div>
        <div
            v-for="article in projectArticles"
            :key="article.slug"
            class="group grid gap-8"
        >
            <NuxtLink
                :to="localePath(`/projects/${article.slug}`)"
                class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
            >
                <NuxtImg
                    :src="article.thumbnail.src"
                    :width="article.thumbnail.width"
                    :height="article.thumbnail.height"
                    :alt="article.title"
                    fit="fill"
                    class="aspect-4/3 h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
                />

                <div
                    class="mt-5 flex min-h-full flex-col justify-between lg:mt-0"
                >
                    <div>
                        <h3
                            class="text-xl text-balance transition-opacity group-hover:opacity-80 md:text-3xl xl:text-4xl"
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
    </section>
</template>

<script setup>
import {
    PROJECT_CATEGORY_BY_SLUG,
    getProjectCategoryDefinition,
    getProjectCategoryLabel,
} from "~/constants/projectCategories";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();
const route = useRoute();

const { data: projectsHeroSection } = await useLocalizedContent(
    "projects-hero",
    "projects/general"
);
const { data: projectEntries } = await useLocalizedCollectionItems(
    "projects-page-list",
    "projects"
);

const activeCategory = computed(() => {
    const category = route.query.category;

    if (typeof category !== "string") {
        return null;
    }

    return getProjectCategoryDefinition(category);
});

const activeCategoryLabel = computed(() => {
    if (!activeCategory.value) {
        return "";
    }

    return getProjectCategoryLabel(
        activeCategory.value.id,
        currentLocale.value
    );
});

const projectArticles = computed(() =>
    sortContentItemsByStem(
        (projectEntries.value ?? []).filter(
            (article) =>
                article.slug &&
                article.thumbnail &&
                (!activeCategory.value ||
                    PROJECT_CATEGORY_BY_SLUG[article.slug] ===
                        activeCategory.value.id)
        )
    )
);

const pageTitle = computed(() => {
    const baseTitle = (() => {
        switch (currentLocale.value) {
            case "tr":
                return "Karash® Şirketi - Projeler";
            case "ar":
                return "شركة كاراش® - المشاريع";
            case "ku":
                return "کۆمپانیای کاراش® - پڕۆژەکان";
            default:
                return "Karash® Company - Projects";
        }
    })();

    if (activeCategoryLabel.value) {
        return `${baseTitle} - ${activeCategoryLabel.value}`;
    }

    return baseTitle;
});
</script>

<style scoped></style>
