<template>
    <div
        ref="headerRef"
        class="full-width wrapper fixed left-0 right-0 top-0 z-50 border-b border-white/0 py-4 transition-colors duration-300 xl:!hidden"
        :class="{
            'border-white/10': isScrolled,
        }"
    >
        <div
            class="full-width absolute inset-0 -z-10 bg-neutral-900/70 opacity-0 backdrop-blur-md transition-opacity duration-300"
            :class="{
                'opacity-100': isScrolled,
            }"
        ></div>
        <header class="flex items-center justify-between">
            <NuxtLink :to="localePath('/')" aria-label="Home">
                <Logo />
            </NuxtLink>

            <!-- Hamburger Menu Button -->
            <button
                class="z-50 flex flex-col gap-1.5 p-2"
                @click="isMenuOpen = !isMenuOpen"
                aria-label="Toggle menu"
            >
                <span
                    class="h-0.5 w-6 bg-white transition-transform duration-300"
                    :class="{ 'translate-y-2 rotate-45': isMenuOpen }"
                ></span>
                <span
                    class="h-0.5 w-6 bg-white transition-opacity duration-300"
                    :class="{ 'opacity-0': isMenuOpen }"
                ></span>
                <span
                    class="h-0.5 w-6 bg-white transition-transform duration-300"
                    :class="{ '-translate-y-2 -rotate-45': isMenuOpen }"
                ></span>
            </button>
        </header>

        <!-- Mobile Navigation Menu -->
        <div
            class="fixed inset-0 z-40 transform bg-neutral-900/70 backdrop-blur-md transition-transform duration-300 ease-in-out"
            :class="isMenuOpen ? 'translate-y-0' : '-translate-y-full'"
        >
            <div class="flex h-full flex-col pt-16">
                <nav class="flex flex-col items-start gap-8 px-6">
                    <NuxtLink
                        v-for="link in header.header_navigation.slice(0, -1)"
                        :key="link.link"
                        :to="localePath(link.link)"
                        class="text-2xl font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                        :class="{
                            'tracking-wide': locale === 'en' || locale === 'tr',
                        }"
                        @click="isMenuOpen = false"
                    >
                        {{ link.title }}
                    </NuxtLink>

                    <!-- Services Dropdown -->
                    <div class="flex flex-col items-start gap-4">
                        <span
                            class="text-2xl font-medium text-neutral-100"
                            :class="{
                                'tracking-wide':
                                    locale === 'en' || locale === 'tr',
                            }"
                        >
                            {{
                                header.header_navigation[
                                    header.header_navigation.length - 1
                                ].title
                            }}
                        </span>
                        <div class="flex flex-col items-start gap-4">
                            <NuxtLink
                                v-for="link in header.header_navigation[
                                    header.header_navigation.length - 1
                                ].sub_items"
                                :key="link.title"
                                :to="localePath(link.link)"
                                class="ps-4 text-lg font-medium text-neutral-100/80 transition-colors hover:text-neutral-400"
                                @click="isMenuOpen = false"
                            >
                                - {{ link.title }}
                            </NuxtLink>
                        </div>
                    </div>
                </nav>

                <div class="mt-auto flex flex-col items-center gap-8 px-6 py-5">
                    <!-- Language Selector -->
                    <div class="flex gap-8">
                        <NuxtLink
                            v-for="lang in ['en', 'ar', 'ku', 'tr']"
                            :key="lang"
                            :to="switchLocalePath(lang)"
                            class="text-lg font-medium text-neutral-100 transition-colors hover:text-neutral-400"
                            @click="
                                isMenuOpen = false;
                                reloadNuxtApp({
                                    ttl: 100,
                                    path: `/${lang === 'en' ? '' : lang}`,
                                });
                            "
                        >
                            {{ lang.toUpperCase() }}
                        </NuxtLink>
                    </div>

                    <!-- CTA Button -->
                    <NuxtLink
                        :to="localePath(header.cta.link)"
                        class="btn !min-w-full text-center"
                        data-variant="primary"
                        @click="isMenuOpen = false"
                    >
                        {{ header.cta.title }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Logo from "./Logo.vue";
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

let enHeader, arHeader, kuHeader, trHeader;

try {
    enHeader = await queryContent(`/en/shared/header`).findOne();
} catch (error) {
    console.error("Error loading English header:", error);
    enHeader = null;
}

try {
    arHeader = await queryContent(`/ar/shared/header`).findOne();
} catch (error) {
    console.error("Error loading Arabic header:", error);
    arHeader = null;
}

try {
    kuHeader = await queryContent(`/ku/shared/header`).findOne();
} catch (error) {
    console.error("Error loading Kurdish header:", error);
    kuHeader = null;
}

try {
    trHeader = await queryContent(`/tr/shared/header`).findOne();
} catch (error) {
    console.error("Error loading Turkish header:", error);
    trHeader = null;
}

const header = computed(() => {
    if (currentLocale.value === "en") return enHeader;
    if (currentLocale.value === "ar") return arHeader;
    if (currentLocale.value === "ku") return kuHeader;
    if (currentLocale.value === "tr") return trHeader;
});
const headerRef = ref(null);
const isScrolled = ref(false);
const isMenuOpen = ref(false);

// Lock body scroll when menu is open
watch(isMenuOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});

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
nav > *:lang(ku) {
    font-family: "Qs_Iranyekan", ui-sans-serif, system-ui, sans-serif,
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
        "Noto Color Emoji";
    font-style: normal;
}
</style>
