<template>
    <div
        class="mt-5 grid gap-8 divide-y divide-white/10 md:mt-6 lg:mt-8 lg:gap-0"
    >
        <ProjectCard
            v-for="article in featuredProjects"
            :key="article.slug"
            :title="article.title"
            :slug="article.slug"
            :thumbnail="article.thumbnail"
        />
    </div>
</template>

<script setup>
import ProjectCard from "./ProjectCard.vue";
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
