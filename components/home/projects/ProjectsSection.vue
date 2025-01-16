<template>
    <section v-if="projectsSection?.title" class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[40ch] text-balance text-2xl md:text-4xl lg:text-5xl">
            {{ projectsSection?.title }}
        </h2>
        <div
            class="mt-5 grid gap-8 divide-y divide-white/10 md:mt-6 lg:mt-8 lg:gap-0"
        >
            <ContentList :path="`/${currentLocale}/projects`" v-slot="{ list }">
                <div
                    v-for="article in list.slice(0, 3)"
                    :key="article.path"
                    class="group grid gap-8"
                >
                    <NuxtLink
                        :to="localePath(`/projects/${article.path}`)"
                        class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
                    >
                        <NuxtImg
                            :src="article.thumbnail.src"
                            :alt="article.title"
                            :width="article.thumbnail.width"
                            :height="article.thumbnail.height"
                            fit="fill"
                            class="aspect-[4/3] h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
                        />

                        <div
                            class="mt-5 flex min-h-full flex-col justify-between lg:mt-0"
                        >
                            <div>
                                <h3
                                    class="text-balance text-xl transition-opacity group-hover:opacity-80"
                                >
                                    {{ article.title }}
                                </h3>
                                <p
                                    class="mt-3 text-base transition-opacity group-hover:opacity-80"
                                >
                                    {{ article.seoDescription }}
                                </p>
                            </div>
                            <button
                                class="btn mt-8 !hidden self-end lg:!flex"
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
            </ContentList>
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

const { width, height } = useWindowSize();

// Robust RTL locale check
const isRTL = computed(() => {
    const rtlLocales = ["ar", "ku", "fa", "he"];
    return rtlLocales.includes(currentLocale.value);
});

// Centralized content loading function
const loadProjectsSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(
            `Error loading projects section for path ${path}:`,
            error
        );
        return null;
    }
};

// Async loading of projects sections for different locales
const [
    enProjectsSection,
    arProjectsSection,
    kuProjectsSection,
    trProjectsSection,
] = await Promise.all([
    loadProjectsSection("/en/home/projects-section"),
    loadProjectsSection("/ar/home/projects-section"),
    loadProjectsSection("/ku/home/projects-section"),
    loadProjectsSection("/tr/home/projects-section"),
]);

// Compute the current locale's projects section
const projectsSection = computed(() => {
    const localeMap = {
        en: enProjectsSection,
        ar: arProjectsSection,
        ku: kuProjectsSection,
        tr: trProjectsSection,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped></style>
