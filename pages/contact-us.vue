<template>
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
                        Your name
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
                        Phone number
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
                        Your email
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
                        Service
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
                        Your message
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
                src="/contact-us/contact-us.jpg"
                alt="contact us"
                width="3152"
                height="3128"
                class="hidden min-h-full w-full rounded border border-white/10 shadow-sm lg:block"
            />
        </div>
    </main>
</template>

<script setup>
useHead({
    title: "Transcend AI - Contact Us",
});

// Get the current locale from i18n
const { locale } = useI18n();
const localePath = useLocalePath();
const currentLocale = locale.value;

const { data: contactUs } = await useAsyncData("contact-us", () =>
    queryContent(`/${currentLocale}/shared/contact-us`).findOne()
);

// form control
import { ref } from "vue";
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
