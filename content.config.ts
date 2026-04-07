import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const numericValue = z.union([z.number(), z.string()]);

const imageAsset = z.object({
    src: z.string(),
    width: numericValue,
    height: numericValue,
});

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: "page",
            source: "**/*.md",
            schema: z
                .object({
                    title: z.string().optional(),
                    description: z.union([z.string(), z.array(z.string())]).optional(),
                    subTitle: z.union([z.string(), z.array(z.string())]).optional(),
                    btnAboutUs: z.string().optional(),
                    btnCta: z.string().optional(),
                    btn: z.string().optional(),
                    btnText: z.string().optional(),
                    author: z.string().optional(),
                    keywords: z.string().optional(),
                    rights: z.string().optional(),
                    slug: z.string().optional(),
                    seoDescription: z.string().optional(),
                    statistics: z
                        .array(
                            z.object({
                                title: z.string(),
                                number: z.string(),
                            })
                        )
                        .optional(),
                    services: z
                        .array(
                            z.object({
                                title: z.string(),
                                imagePath: z.string(),
                                linkPath: z.string(),
                            })
                        )
                        .optional(),
                    locations: z
                        .array(
                            z.object({
                                city: z.string(),
                                locationLink: z.string().optional(),
                                location: z.string(),
                                phones: z
                                    .array(
                                        z.object({
                                            number: z.string(),
                                            link: z.string(),
                                        })
                                    )
                                    .optional(),
                            })
                        )
                        .optional(),
                    principles: z
                        .array(
                            z.object({
                                title: z.string(),
                                value: z.string(),
                                description: z.array(z.string()),
                            })
                        )
                        .optional(),
                    thumbnail: imageAsset.optional(),
                    images: z.union([z.array(z.string()), z.array(imageAsset)]).optional(),
                    header_navigation: z
                        .array(
                            z.object({
                                title: z.string(),
                                link: z.string().optional(),
                                sub_items: z
                                    .array(
                                        z.object({
                                            title: z.string(),
                                            link: z.string(),
                                        })
                                    )
                                    .optional(),
                            })
                        )
                        .optional(),
                    cta: z
                        .object({
                            title: z.string(),
                            link: z.string(),
                        })
                        .optional(),
                    footer_navigation: z
                        .array(
                            z.object({
                                section_title: z.string(),
                                section_links: z.array(
                                    z.object({
                                        page_url: z.string(),
                                        link_text: z.string(),
                                    })
                                ),
                            })
                        )
                        .optional(),
                    formTitle: z.string().optional(),
                    formDescription: z.string().optional(),
                    options: z
                        .array(
                            z.object({
                                label: z.string(),
                                value: z.string(),
                            })
                        )
                        .optional(),
                })
                .passthrough(),
        }),
    },
});
