<template>
    <main class="mt-40 md:mt-44 lg:mt-52">
        <h1
            class="mx-auto max-w-[20ch] text-balance text-center text-4xl md:text-7xl lg:text-7.5xl"
        >
            {{ projectsHeroSection?.title }}
        </h1>
    </main>
    <section class="mt-5 divide-y divide-white/10 md:mt-6 lg:mt-8">
        <ContentList :path="`/${currentLocale}/projects`" v-slot="{ list }">
            <div
                v-for="article in list.slice(0, -1)"
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
    </section>
</template>

<script setup>
const { locale } = useI18n();
const currentLocale = locale.value;
const localePath = useLocalePath();

const { data: projectsHeroSection } = await useAsyncData("hero-section", () =>
    queryContent(`/${currentLocale}/projects/general`).findOne()
);
</script>

<style scoped></style>
