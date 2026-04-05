import { computed, toValue } from "vue";
import type { MaybeRefOrGetter } from "vue";
import { queryCollection, useAsyncData, useI18n } from "#imports";

const SITE_CONTENT_COLLECTION = "content";

const normalizeContentPath = (contentPath: string) =>
    contentPath.startsWith("/") ? contentPath : `/${contentPath}`;

const localizedContentPath = (locale: string, contentPath: string) =>
    `/${locale}${normalizeContentPath(contentPath)}`;

const orderFromStem = (stem = "") => {
    const match = stem.split("/").pop()?.match(/^(\d+)\./);

    return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

export async function useLocalizedContent(key: string, contentPath: string) {
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);

    return await useAsyncData(
        () => `${key}-${currentLocale.value}`,
        () =>
            queryCollection(SITE_CONTENT_COLLECTION)
                .path(localizedContentPath(currentLocale.value, contentPath))
                .first(),
        { watch: [currentLocale] }
    );
}

export async function useLocalizedCollectionItems(
    key: string,
    sectionPath: string
) {
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);

    return await useAsyncData(
        () => `${key}-${currentLocale.value}`,
        () =>
            queryCollection(SITE_CONTENT_COLLECTION)
                .where(
                    "path",
                    "LIKE",
                    `${localizedContentPath(currentLocale.value, sectionPath)}%`
                )
                .all(),
        { watch: [currentLocale] }
    );
}

export async function useLocalizedContentBySlug(
    key: string,
    sectionPath: string,
    slug: MaybeRefOrGetter<string | undefined>
) {
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);
    const currentSlug = computed(() => toValue(slug));

    return await useAsyncData(
        () => `${key}-${currentLocale.value}-${currentSlug.value ?? "missing"}`,
        () => {
            if (!currentSlug.value) {
                return null;
            }

            return queryCollection(SITE_CONTENT_COLLECTION)
                .where(
                    "path",
                    "LIKE",
                    `${localizedContentPath(currentLocale.value, sectionPath)}/%`
                )
                .where("slug", "=", currentSlug.value)
                .first();
        },
        { watch: [currentLocale, currentSlug] }
    );
}

export function sortContentItemsByStem<T extends { stem?: string }>(items: T[] = []) {
    return [...items].sort((left, right) => {
        const orderDifference = orderFromStem(left.stem) - orderFromStem(right.stem);

        if (orderDifference !== 0) {
            return orderDifference;
        }

        return (left.stem ?? "").localeCompare(right.stem ?? "");
    });
}
