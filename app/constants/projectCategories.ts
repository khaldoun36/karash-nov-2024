export const PROJECT_CATEGORY_DEFINITIONS = [
    {
        id: "exclusive-store",
        sourceValue: "Exlusive Store",
        labels: {
            en: "Exlusive Store",
            ar: "المتاجر الحصرية",
            ku: "فرۆشگای تایبەت",
            tr: "Ayrıcalıklı Mağazalar",
        },
    },
    {
        id: "custom-design-kitchen",
        sourceValue: "Custom Design Kitchen",
        labels: {
            en: "Custom Design Kitchen",
            ar: "مطابخ بتصميم مخصص",
            ku: "چێشتخانە بە دیزاینی تایبەت",
            tr: "Özel Tasarım Mutfaklar",
        },
    },
    {
        id: "residential-projects",
        sourceValue: "Residential Projects",
        labels: {
            en: "Residential Projects",
            ar: "المشاريع السكنية",
            ku: "پڕۆژە نیشتەجێییەکان",
            tr: "Konut Projeleri",
        },
    },
    {
        id: "family-mall-column",
        sourceValue: "Family Mall Column",
        labels: {
            en: "Family Mall Column",
            ar: "أعمدة فاميلي مول",
            ku: "ستوونی فامیلی مۆڵ",
            tr: "Family Mall Kolonu",
        },
    },
    {
        id: "healthcare-interiors",
        sourceValue: "Healthcare Interiors",
        labels: {
            en: "Healthcare Interiors",
            ar: "المساحات الداخلية للرعاية الصحية",
            ku: "ناوخۆی تەندروستی",
            tr: "Sağlık Mekanları",
        },
    },
    {
        id: "men-store",
        sourceValue: "Men Store",
        labels: {
            en: "Men Store",
            ar: "المتجر الرجالي",
            ku: "فرۆشگای پیاوان",
            tr: "Erkek Mağazası",
        },
    },
    {
        id: "restaurant-interior",
        sourceValue: "Restaurant Interior",
        labels: {
            en: "Restaurant Interior",
            ar: "التصميم الداخلي للمطاعم",
            ku: "ناوخۆی ڕێستۆران",
            tr: "Restoran İç Mekanı",
        },
    },
    {
        id: "tv-show-design",
        sourceValue: "Tv show Design",
        labels: {
            en: "Tv show Design",
            ar: "تصميم برامج التلفزيون",
            ku: "دیزاینی پڕۆگرامی تەلەفزیۆن",
            tr: "TV Programı Tasarımı",
        },
    },
] as const;

export const PROJECT_CATEGORY_BY_SLUG = {
    "jacob-co-boutique": "exclusive-store",
    "sumaryan-time": "exclusive-store",
    "classic-white-and-gold-kitchen": "custom-design-kitchen",
    "elegant-villa-design": "residential-projects",
    "family-mall-column": "family-mall-column",
    labortary: "healthcare-interiors",
    "luxury-mansion-balad": "residential-projects",
    "men-store": "men-store",
    "modern-dental-care": "healthcare-interiors",
    "modern-kitchen-design": "custom-design-kitchen",
    "modern-villa-concept": "residential-projects",
    "pharma-office": "healthcare-interiors",
    pharmacy: "healthcare-interiors",
    "bestoon-samad-restaurant-baghdad": "restaurant-interior",
    "today-restaurant-erbil": "restaurant-interior",
    "classic-kitchen-design": "custom-design-kitchen",
    "tv-show-design": "tv-show-design",
} as const;

export type ProjectCategoryDefinition =
    (typeof PROJECT_CATEGORY_DEFINITIONS)[number];
export type ProjectCategoryId = ProjectCategoryDefinition["id"];
export type ProjectLocale = "en" | "ar" | "ku" | "tr";

const PROJECT_CATEGORY_BY_ID = Object.fromEntries(
    PROJECT_CATEGORY_DEFINITIONS.map((category) => [category.id, category])
) as Record<ProjectCategoryId, ProjectCategoryDefinition>;

export function getProjectCategoryDefinition(categoryId?: string | null) {
    if (!categoryId) {
        return null;
    }

    return PROJECT_CATEGORY_BY_ID[categoryId as ProjectCategoryId] ?? null;
}

export function getProjectCategoryLabel(
    categoryId: ProjectCategoryId,
    locale: ProjectLocale
) {
    return PROJECT_CATEGORY_BY_ID[categoryId].labels[locale];
}
