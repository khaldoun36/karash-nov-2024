<template>
    <section class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="max-w-[40ch] text-balance text-3xl md:text-4xl lg:text-5xl">
            {{ projectsSection?.title }}
        </h2>
        <div class="mt-5 md:mt-6 lg:mt-8">
            <ContentList :path="`/${currentLocale}/projects`" v-slot="{ list }">
                <div v-for="article in list.slice(0, 3)" :key="article.path">
                    <NuxtLink
                        to="https://www.theverge.com/"
                        class="flex flex-col border-b border-white/10 py-5 md:py-6 lg:flex-row lg:items-start lg:gap-20 lg:py-8"
                    >
                        <NuxtImg
                            :src="article.thumbnail"
                            :alt="article.title"
                            width="4000"
                            height="3000"
                            class="aspect-[4/3] h-auto flex-1 overflow-clip rounded border border-white/10 object-cover lg:max-w-[50%]"
                        />

                        <div
                            class="flex flex-col justify-between lg:aspect-[1.2]"
                        >
                            <div>
                                <h3 class="mt-5 text-balance text-2xl lg:mt-0">
                                    {{ article.title }}
                                </h3>
                                <p class="mt-3 text-base md:text-lg">
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
const currentLocale = locale.value;

const { data: projectsSection } = await useAsyncData("projects-section", () =>
    queryContent(`/${currentLocale}/home/projects-section`).findOne()
);
</script>

<style scoped></style>
