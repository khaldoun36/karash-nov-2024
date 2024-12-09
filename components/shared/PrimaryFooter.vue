<template>
    <div
        class="wrapper full-width mt-20 border-t border-white/10 bg-black md:mt-24 lg:mt-32"
    >
        <footer
            class="flex flex-col items-start justify-between py-10 md:py-12 lg:flex-row lg:py-16"
        >
            <div
                class="mb-16 flex h-full items-start justify-between md:mb-0 lg:flex-col"
            >
                <NuxtLink
                    :to="localePath('/')"
                    aria-label="home link"
                    class="block"
                >
                    <Logo />
                </NuxtLink>
                <div class="social-media hidden items-center gap-8 lg:flex">
                    <NuxtLink to="https://www.instagram.com/karash.kitchen/">
                        <Icon
                            name="ph:instagram-logo"
                            size="32"
                            class="text-neutral-300 transition-colors hover:text-neutral-500"
                        />
                    </NuxtLink>
                    <NuxtLink to="https://www.facebook.com/@karash.Kitchen">
                        <Icon
                            name="ph:facebook-logo"
                            size="32"
                            class="text-neutral-300 transition-colors hover:text-neutral-500"
                        />
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/company/karashco">
                        <Icon
                            name="ph:linkedin-logo-light"
                            size="32"
                            class="text-neutral-300 transition-colors hover:text-neutral-500"
                        />
                    </NuxtLink>
                </div>
            </div>
            <div
                class="links-container flex w-full flex-col gap-16 md:mt-16 md:flex-row md:justify-between lg:mt-0 lg:w-fit xl:gap-64"
            >
                <div
                    v-for="item in footer?.footer_navigation"
                    :key="item.section_title"
                >
                    <h3 class="text-lg">{{ item.section_title }}</h3>
                    <div class="mt-8 flex flex-col gap-5">
                        <NuxtLink
                            v-for="link in item.section_links"
                            :key="link.page_url"
                            :to="localePath(link.page_url)"
                            class="text-base"
                        >
                            {{ link.link_text }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import Logo from "./Logo.vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

const { data: footer } = await useAsyncData(
    "footer",
    () => queryContent(`/${currentLocale.value}/shared/footer`).findOne(),
    {
        watch: [currentLocale],
        cache: true, // Enable caching of results
        lazy: true,
    }
);
</script>

<style scoped></style>
