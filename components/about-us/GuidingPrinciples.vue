<template>
    <section v-if="guidingPrinciples?.title" class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-3xl md:text-5xl xl:text-6xl">
            {{ guidingPrinciples?.title }}
        </h2>
        <AccordionRoot
            class="mt-20 divide-y divide-white/10 md:mt-24 lg:mt-32"
            default-value="'item-1'"
            type="single"
            :collapsible="true"
            :data-id="uniqueId"
        >
            <AccordionItem
                v-for="principle in guidingPrinciples?.principles"
                :key="principle.value"
                :value="principle.value"
                class="py-10 first-of-type:pt-0 md:py-12 lg:grid lg:grid-cols-2 lg:py-16"
            >
                <AccordionHeader class="col-span-2">
                    <AccordionTrigger
                        class="AccordionTrigger flex min-w-full items-center justify-between"
                    >
                        <h3
                            class="text-xl text-neutral-400 md:text-3xl xl:text-5xl"
                        >
                            {{ principle.title }}
                        </h3>
                        <button class="morph-icon">
                            <span></span>
                            <span></span>
                        </button>
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent
                    class="AccordionContent mt-8 space-y-6 lg:mt-12"
                >
                    <p
                        v-for="description in principle.description"
                        class="text-base text-neutral-100"
                    >
                        {{ description }}
                    </p>
                </AccordionContent>
            </AccordionItem>
        </AccordionRoot>
    </section>

    <section v-else class="mt-20 md:mt-24 lg:mt-32">
        <h2 class="text-2xl md:text-4xl lg:text-5xl">
            No guiding principles available
        </h2>
    </section>
</template>

<script setup>
import {
    AccordionContent,
    AccordionHeader,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger,
} from "radix-vue";

const uniqueId = useId();

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Centralized content loading function
const loadGuidingPrinciples = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(
            `Error loading guiding principles for path ${path}:`,
            error
        );
        return null;
    }
};

// Async loading of guiding principles for different locales
const [
    enGuidingPrinciples,
    arGuidingPrinciples,
    kuGuidingPrinciples,
    trGuidingPrinciples,
] = await Promise.all([
    loadGuidingPrinciples("/en/about/guiding-principles"),
    loadGuidingPrinciples("/ar/about/guiding-principles"),
    loadGuidingPrinciples("/ku/about/guiding-principles"),
    loadGuidingPrinciples("/tr/about/guiding-principles"),
]);

// Compute the current locale's guiding principles
const guidingPrinciples = computed(() => {
    const localeMap = {
        en: enGuidingPrinciples,
        ar: arGuidingPrinciples,
        ku: kuGuidingPrinciples,
        tr: trGuidingPrinciples,
    };
    return localeMap[currentLocale.value] || null;
});
</script>

<style scoped>
.AccordionContent {
    overflow: clip;
    will-change: height;
}
.AccordionContent[data-state="open"] {
    animation: slideDown 250ms ease-in-out;
}

.AccordionTrigger[data-state="open"] > .AccordionChevron {
    transform: rotate(180deg);
}
.AccordionContent[data-state="closed"] {
    animation: slideUp 250ms ease-in-out;
}

@keyframes slideDown {
    from {
        height: 0;
    }
    to {
        height: var(--radix-accordion-content-height);
    }
}

@keyframes slideUp {
    from {
        height: var(--radix-accordion-content-height);
    }
    to {
        height: 0;
    }
}

.morph-icon {
    color: theme("colors.neutral.300");
    width: 32px;
    height: 32px;
    border: 0;
    font-size: 1em;
    position: relative;
}

.morph-icon span {
    position: absolute;
    transition: 300ms;
    background: theme("colors.neutral.300");
    border-radius: 2px;
}

.morph-icon span:first-child {
    top: 25%;
    bottom: 25%;
    width: 10%;
    left: 45%;
}

.morph-icon span:last-child {
    left: 25%;
    right: 25%;
    height: 10%;
    top: 45%;
}

.AccordionTrigger[data-state="open"] > .morph-icon span {
    transform: rotate(90deg);
}

.AccordionTrigger[data-state="open"] > .morph-icon span:last-child {
    left: 50%;
    right: 50%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: opacity 250ms ease-in-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
