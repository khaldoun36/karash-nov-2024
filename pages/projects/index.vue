<template>
    <Head>
        <Title>{{ pageTitle }}</Title>
    </Head>
    <main class="mt-40 md:mt-44 lg:mt-52">
        <h1
            class="mx-auto max-w-[20ch] text-balance text-center text-5xl md:text-7xl xl:text-7.5xl"
        >
            {{ projectsHeroSection?.title }}
        </h1>
    </main>
    <section class="mt-20 divide-y divide-white/10 md:mt-24 lg:mt-32">
        <ContentList :path="`/${currentLocale}/projects`" v-slot="{ list }">
            <div
                v-for="article in list.slice(0, -1)"
                :key="article.path"
                class="group grid gap-8"
            >
                <NuxtLink
                    :to="localePath(`/projects/${article.path}`)"
                    class="py-5 md:py-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-20 lg:py-8"
                >
                    <NuxtImg
                        :src="article.thumbnail.src"
                        :width="article.thumbnail.width"
                        :height="article.thumbnail.height"
                        :alt="article.title"
                        fit="fill"
                        class="aspect-[4/3] h-auto overflow-clip rounded border border-white/10 object-cover transition-opacity group-hover:opacity-80"
                    />

                    <div
                        class="mt-5 flex min-h-full flex-col justify-between lg:mt-0"
                    >
                        <div>
                            <h3
                                class="text-balance text-xl transition-opacity group-hover:opacity-80 md:text-3xl xl:text-4xl"
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
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

const { width, height } = useWindowSize();
// Centralized content loading function
const loadProjectsHeroSection = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(
            `Error loading projects hero section for path ${path}:`,
            error
        );
        return null;
    }
};

// Async loading of hero sections for different locales
const [
    enProjectsHeroSection,
    arProjectsHeroSection,
    kuProjectsHeroSection,
    trProjectsHeroSection,
] = await Promise.all([
    loadProjectsHeroSection("/en/projects/general"),
    loadProjectsHeroSection("/ar/projects/general"),
    loadProjectsHeroSection("/ku/projects/general"),
    loadProjectsHeroSection("/tr/projects/general"),
]);

// Compute the current locale's hero section
const projectsHeroSection = computed(() => {
    const localeMap = {
        en: enProjectsHeroSection,
        ar: arProjectsHeroSection,
        ku: kuProjectsHeroSection,
        tr: trProjectsHeroSection,
    };
    return localeMap[currentLocale.value] || null;
});

const pageTitle = computed(() => {
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
});
</script>

<style scoped></style>
