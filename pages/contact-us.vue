<template>
    <Head>
        <Title>{{ pageTitle }}</Title>
    </Head>
    <main class="wrapper py-24 pt-32 sm:pb-32 sm:pt-48">
        <div
            class="grid gap-16 rounded-lg border border-white/10 bg-neutral-900 p-8 shadow-sm lg:grid-cols-2"
        >
            <form @submit.prevent="submitForm" class="flex flex-col gap-8">
                <div>
                    <h1 class="text-3xl md:text-4xl lg:text-5xl">
                        {{ contactUs?.formTitle }}
                    </h1>
                    <p class="mt-4 text-base md:text-lg">
                        {{ contactUs?.formDescription }}
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <label for="name" class="text-base font-medium md:text-lg">
                        {{ formLabels.name }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        v-model="name"
                        required
                        class="h-12 rounded-lg border border-white/10 bg-neutral-800 px-4 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="phone" class="text-base font-medium md:text-lg">
                        {{ formLabels.phone }}
                        <span class="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        v-model="phone"
                        required
                        class="h-12 rounded-lg border border-white/10 bg-neutral-800 px-4 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-base font-medium md:text-lg">
                        {{ formLabels.email }}
                    </label>
                    <input
                        type="email"
                        name="email"
                        v-model="email"
                        class="h-12 rounded-lg border border-white/10 bg-neutral-800 px-4 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label
                        for="service"
                        class="text-base font-medium md:text-lg"
                    >
                        {{ formLabels.service }}
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="grid gap-8 md:grid-cols-2">
                        <button
                            v-for="option in contactUs?.options"
                            :key="option.value"
                            type="button"
                            :class="[
                                'flex items-center justify-start rounded-lg border px-4 py-3 transition-colors',
                                service === option.value
                                    ? 'border-primary-500 text-primary-500'
                                    : 'border-white/10',
                            ]"
                            @click="service = option.value"
                        >
                            <input
                                type="radio"
                                :id="option.value"
                                name="service"
                                :value="option.value"
                                v-model="service"
                                required
                                class="hidden"
                            />
                            <label
                                :for="option.value"
                                class="cursor-pointer text-base"
                                >{{ option.label }}</label
                            >
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label
                        for="message"
                        class="text-base font-medium md:text-lg"
                    >
                        {{ formLabels.message }}
                        <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        name="message"
                        v-model="message"
                        required
                        class="h-32 rounded-lg border border-white/10 bg-neutral-800 px-4 py-2 focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-primary-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="btn !min-w-full"
                    data-variant="primary"
                >
                    {{ contactUs?.btnText }}
                </button>
            </form>
            <NuxtImg
                src="v1733909962/contact-us_k4yem2.jpg"
                alt="contact us"
                width="2466"
                height="3762"
                class="hidden min-h-full w-full rounded border border-white/10 shadow-sm lg:block"
            />
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";

const { locale } = useI18n();
const currentLocale = computed(() => locale.value);
const localePath = useLocalePath();

// Form labels translations
const formLabels = computed(() => {
    const labels = {
        en: {
            name: "Your name",
            phone: "Phone number",
            email: "Your email",
            service: "Service",
            message: "Your message",
        },
        ar: {
            name: "الاسم",
            phone: "رقم الهاتف",
            email: "البريد الإلكتروني",
            service: "الخدمة",
            message: "رسالتك",
        },
        ku: {
            name: "ناوی تۆ",
            phone: "ژمارەی تەلەفۆن",
            email: "ئیمەیڵی تۆ",
            service: "خزمەتگوزاری",
            message: "پەیامەکەت",
        },
        tr: {
            name: "Adınız",
            phone: "Telefon numarası",
            email: "E-posta adresiniz",
            service: "Hizmet",
            message: "Mesajınız",
        },
    };
    return labels[currentLocale.value] || labels.en;
});

// Centralized content loading function
const loadContactUs = async (path) => {
    try {
        return await queryContent(path).findOne();
    } catch (error) {
        console.error(`Error loading contact us for path ${path}:`, error);
        return null;
    }
};

// Async loading of contact us for different locales
const [enContactUs, arContactUs, kuContactUs, trContactUs] = await Promise.all([
    loadContactUs("/en/shared/contact-us"),
    loadContactUs("/ar/shared/contact-us"),
    loadContactUs("/ku/shared/contact-us"),
    loadContactUs("/tr/shared/contact-us"),
]);

// Compute the current locale's contact us section
const contactUs = computed(() => {
    const localeMap = {
        en: enContactUs,
        ar: arContactUs,
        ku: kuContactUs,
        tr: trContactUs,
    };
    return localeMap[currentLocale.value] || null;
});

const pageTitle = computed(() => {
    switch (currentLocale.value) {
        case "tr":
            return "Karash® Şirketi - İletişim";
        case "ar":
            return "شركة كاراش® - تواصل معنا";
        case "ku":
            return "کۆمپانیای کاراش® - پەیوەندی";
        default:
            return "Karash® Company - Contact Us";
    }
});

// form control
const WEB3FORMS_ACCESS_KEY = "63da4544-2ce2-4fa9-9cee-b51a2927b918";
const name = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const service = ref("");

const resetForm = () => {
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    service.value = "";
};

const submitForm = async () => {
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value,
            service: service.value,
        }),
    });
    const result = await response.json();
    if (result.success) {
        resetForm();
        // Redirect to home page after successful submission
        alert("Message sent successfully");

        setTimeout(() => {
            navigateTo(localePath("/"));
        }, 5000);
    }
};
</script>

<style scoped></style>
