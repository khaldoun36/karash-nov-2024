<template>
    <div
        ref="headerRef"
        class="full-width wrapper fixed left-0 right-0 top-0 z-50 !hidden border-b border-white/0 bg-neutral-900/0 py-4 transition-colors duration-300 lg:!grid"
        :class="{
            '!border-white/10 !bg-neutral-900/70 !backdrop-blur-md': isScrolled,
        }"
    >
        <header class="flex items-center justify-between">
            <NuxtLink :to="localePath('/')" aria-label="Home">
                <Logo />
            </NuxtLink>
            <nav class="flex gap-8">
                <NuxtLink
                    v-for="link in header.header_navigation.slice(0, -1)"
                    :to="localePath(link.link)"
                    class="text-base font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                >
                    {{ link.title }}
                </NuxtLink>
                <PopoverRoot :data-id="uniqueID">
                    <PopoverTrigger
                        class="flex items-center gap-1 text-base font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                    >
                        <span>
                            {{
                                header.header_navigation[
                                    header.header_navigation.length - 1
                                ].title
                            }}
                        </span>
                        <Icon
                            name="heroicons:chevron-down-20-solid"
                            class="-mt-0.5"
                            aria-hidden="true"
                            size="18px"
                        />
                    </PopoverTrigger>
                    <PopoverPortal>
                        <PopoverContent
                            class="flex aspect-[4/3] h-auto w-[250px] flex-col items-start justify-between rounded border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-md"
                            side="bottom"
                            :side-offset="10"
                        >
                            <div class="flex flex-col space-y-4">
                                <NuxtLink
                                    v-for="link in header.header_navigation[
                                        header.header_navigation.length - 1
                                    ].sub_items"
                                    :key="link.title"
                                    :to="localePath(link.link)"
                                    class="text-balance text-base font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                                >
                                    {{ link.title }}
                                </NuxtLink>
                            </div>
                            <PopoverArrow class="fill-neutral-900/70" />
                        </PopoverContent>
                    </PopoverPortal>
                </PopoverRoot>
            </nav>
            <div class="flex items-center gap-4" aria-label="header-buttons">
                <PopoverRoot :data-id="uniqueID_2">
                    <PopoverTrigger class="btn" data-variant="secondary">
                        <span>
                            {{ currentLocale.toUpperCase() }}
                        </span>
                        <Icon
                            name="heroicons:chevron-down-20-solid"
                            class="-mt-0.5"
                            aria-hidden="true"
                            size="18px"
                        />
                    </PopoverTrigger>
                    <PopoverPortal>
                        <PopoverContent
                            class="flex aspect-[4/3] h-auto w-[250px] flex-col items-start justify-between rounded border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-md"
                            side="bottom"
                            :side-offset="10"
                        >
                            <div class="flex flex-col space-y-4">
                                <NuxtLink :to="switchLocalePath('en')"
                                    >EN</NuxtLink
                                >
                                <NuxtLink :to="switchLocalePath('ar')"
                                    >AR</NuxtLink
                                >
                                <NuxtLink :to="switchLocalePath('ku')"
                                    >KU</NuxtLink
                                >
                                <NuxtLink :to="switchLocalePath('tr')"
                                    >TR</NuxtLink
                                >
                            </div>
                            <PopoverArrow class="fill-neutral-900/70" />
                        </PopoverContent>
                    </PopoverPortal>
                </PopoverRoot>
                <NuxtLink
                    :to="localePath(header.cta.link)"
                    class="btn"
                    data-variant="primary"
                >
                    {{ header.cta.title }}
                </NuxtLink>
            </div>
        </header>
    </div>
</template>

<script setup>
import Logo from "./Logo.vue";

// Drop Down start
import {
    PopoverArrow,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
} from "radix-vue";
// Drop Down end
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const enHeader = await queryContent(`/en/shared/header`).findOne();
const arHeader = await queryContent(`/ar/shared/header`).findOne();
const kuHeader = await queryContent(`/ku/shared/header`).findOne();
const trHeader = await queryContent(`/tr/shared/header`).findOne();

const header = computed(() => {
    if (currentLocale.value === "en") return enHeader;
    if (currentLocale.value === "ar") return arHeader;
    if (currentLocale.value === "ku") return kuHeader;
    if (currentLocale.value === "tr") return trHeader;
});

const uniqueID = useId();
const uniqueID_2 = useId();

const headerRef = ref(null);
const isScrolled = ref(false);

onMounted(() => {
    const handleScroll = () => {
        isScrolled.value = window.scrollY > 100;
    };

    // Check scroll position immediately
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Clean up
    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });
});
</script>

<style scoped></style>
