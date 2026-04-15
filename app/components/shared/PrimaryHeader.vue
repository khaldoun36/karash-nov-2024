<template>
    <!-- :class="{ uppercase: locale === 'en' }" -->
    <div
        ref="headerRef"
        class="full-width wrapper fixed top-0 right-0 left-0 z-50 hidden! border-b border-white/0 bg-neutral-900/0 transition-colors duration-300 lg:grid!"
        :class="{
            'border-white/10! bg-neutral-900/70! backdrop-blur-md!': isScrolled,
        }"
    >
        <header class="flex items-center justify-between">
            <NuxtLink :to="localePath('/')" aria-label="Home">
                <Logo />
            </NuxtLink>
            <nav class="mt-1 flex gap-8">
                <template
                    v-for="link in primaryNavigationLinks"
                    :key="link.link ?? link.title"
                >
                    <PopoverRoot
                        v-if="link.link === '/projects'"
                        v-model:open="isProjectsMenuOpen"
                        :data-id="uniqueID_3"
                        class="popover-root"
                    >
                        <PopoverTrigger
                            class="flex items-center gap-1 text-lg text-neutral-100 transition-colors hover:text-neutral-400"
                            :class="{
                                'tracking-wide':
                                    locale === 'en' || locale === 'tr',
                            }"
                        >
                            <span>
                                {{ link.title }}
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
                                class="flex aspect-4/3 h-auto w-62.5 flex-col items-start justify-between rounded border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-md"
                                side="bottom"
                                :side-offset="10"
                            >
                                <div class="flex flex-col space-y-4">
                                    <NuxtLink
                                        v-for="categoryItem in projectCategoryItems"
                                        :key="categoryItem.id"
                                        :to="categoryItem.to"
                                        @click="isProjectsMenuOpen = false"
                                    >
                                        {{ categoryItem.title }}
                                    </NuxtLink>
                                </div>
                                <PopoverArrow class="fill-neutral-900/70" />
                            </PopoverContent>
                        </PopoverPortal>
                    </PopoverRoot>
                    <NuxtLink
                        v-else
                        :to="localePath(link.link)"
                        class="text-lg text-neutral-100 transition-colors hover:text-neutral-400"
                        :class="{
                            'tracking-wide': locale === 'en' || locale === 'tr',
                        }"
                    >
                        {{ link.title }}
                    </NuxtLink>
                </template>
                <PopoverRoot :data-id="uniqueID" class="popover-root">
                    <PopoverTrigger
                        v-if="servicesNavigationGroup"
                        class="flex items-center gap-1 text-base font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                    >
                        <span>
                            {{ servicesNavigationGroup.title }}
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
                            class="flex aspect-4/3 h-auto w-62.5 flex-col items-start justify-between rounded border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-md"
                            side="bottom"
                            :side-offset="10"
                        >
                            <div class="flex flex-col space-y-4">
                                <NuxtLink
                                    v-for="link in serviceSubItems"
                                    :key="link.title"
                                    :to="localePath(link.link)"
                                    class="text-base font-medium text-balance text-neutral-100 transition-colors hover:text-neutral-400"
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
                            class="flex aspect-4/3 h-auto w-62.5 flex-col items-start justify-between rounded border border-white/10 bg-neutral-900/70 p-8 backdrop-blur-md"
                            side="bottom"
                            :side-offset="10"
                        >
                            <div class="flex flex-col space-y-4">
                                <NuxtLink
                                    :to="switchLocalePath('en')"
                                    @click="
                                        reloadNuxtApp({
                                            ttl: 100,
                                            path: '/',
                                        })
                                    "
                                >
                                    EN</NuxtLink
                                >
                                <NuxtLink
                                    :to="switchLocalePath('ar')"
                                    @click="
                                        reloadNuxtApp({
                                            ttl: 100,
                                            path: '/ar',
                                        })
                                    "
                                    >AR</NuxtLink
                                >
                                <NuxtLink
                                    :to="switchLocalePath('ku')"
                                    @click="
                                        reloadNuxtApp({
                                            ttl: 100,
                                            path: '/ku',
                                        })
                                    "
                                    >KU</NuxtLink
                                >
                                <NuxtLink
                                    :to="switchLocalePath('tr')"
                                    @click="
                                        reloadNuxtApp({
                                            ttl: 100,
                                            path: '/tr',
                                        })
                                    "
                                    >TR</NuxtLink
                                >
                            </div>
                            <PopoverArrow class="fill-neutral-900/70" />
                        </PopoverContent>
                    </PopoverPortal>
                </PopoverRoot>
                <NuxtLink
                    v-if="headerCta?.link"
                    :to="localePath(headerCta.link)"
                    class="btn"
                    data-variant="primary"
                >
                    {{ headerCta.title }}
                </NuxtLink>
            </div>
        </header>
    </div>
</template>

<script setup>
import Logo from "./Logo.vue";
import {
    PROJECT_CATEGORY_DEFINITIONS,
    getProjectCategoryLabel,
} from "~/constants/projectCategories";

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
const route = useRoute();
const { data: header } = await useLocalizedContent(
    "primary-header",
    "shared/header"
);
const headerNavigation = computed(() => header.value?.header_navigation ?? []);
const primaryNavigationLinks = computed(() =>
    headerNavigation.value.slice(0, -1)
);
const servicesNavigationGroup = computed(
    () => headerNavigation.value.at(-1) ?? null
);
const serviceSubItems = computed(
    () => servicesNavigationGroup.value?.sub_items ?? []
);
const headerCta = computed(() => header.value?.cta ?? null);
const projectCategoryItems = computed(() => [
    {
        id: "all",
        title:
            currentLocale.value === "ar"
                ? "الكل"
                : currentLocale.value === "tr"
                  ? "Tümü"
                  : currentLocale.value === "ku"
                    ? "هەموو"
                    : "All",
        to: localePath("/projects"),
    },
    ...PROJECT_CATEGORY_DEFINITIONS.map((category) => ({
        id: category.id,
        title: getProjectCategoryLabel(
            category.id,
            currentLocale.value
        ),
        to: localePath({
            path: "/projects",
            query: { category: category.id },
        }),
    })),
]);

const uniqueID = useId();
const uniqueID_2 = useId();
const uniqueID_3 = useId();

const headerRef = ref(null);
const isScrolled = ref(false);
const isProjectsMenuOpen = ref(false);

watch(
    () => route.fullPath,
    () => {
        isProjectsMenuOpen.value = false;
    }
);

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

<style scoped>
nav > *,
.popover-root > * {
    font-family: "MinionVariableConcept", ui-serif, Georgia, Cambria,
        "Times New Roman", Times, serif;
    font-style: normal;
}

nav > *:lang(ar),
nav > *:lang(ku),
.popover-root > *:lang(ar),
.popover-root > *:lang(ku) {
    font-family: "Qs_Iranyekan", ui-sans-serif, system-ui, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        "Noto Color Emoji";
    font-style: normal;
}
</style>
