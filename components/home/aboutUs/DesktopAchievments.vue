<template>
  <div
    class="hidden lg:flex justify-between mt-10 md:mt-12 lg:mt-16 border-y border-white/10 relative"
  >
    <div
      class="text-center my-10 md:my-12 lg:my-16 first:text-start last:text-end"
      v-for="item in aboutSection?.statistics"
    >
      <p class="text-5xl font-extralight text-neutral-100">
        {{ item?.number }}
      </p>
      <h3 class="text-base mt-8 font-light text-neutral-400">
        {{ item?.title }}
      </h3>
    </div>
    <div
      class="absolute h-1/2 w-[1.5px] bg-white/10 left-[20%] top-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute h-1/2 w-[1.5px] bg-white/10 left-[50%] top-1/2 -translate-y-1/2"
    ></div>
    <div
      class="absolute h-1/2 w-[1.5px] bg-white/10 left-[80%] top-1/2 -translate-y-1/2"
    ></div>
  </div>
</template>

<script setup>
  const { locale } = useI18n();
  const currentLocale = locale.value;

  const { data: aboutSection } = await useAsyncData("about-section", () =>
    queryContent(`/${currentLocale}/home/about-section`).findOne()
  );
</script>

<style scoped></style>
