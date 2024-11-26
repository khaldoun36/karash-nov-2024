<template>
  <div
    class="achievements relative grid grid-cols-2 grid-rows-2 mt-10 md:mt-12 lg:mt-16 lg:hidden"
  >
    <div class="text-center py-8" v-for="item in aboutSection?.statistics">
      <p class="text-4xl text-neutral-100">
        {{ item?.number }}
      </p>
      <h3 class="text-sm md:text-base mt-3 text-neutral-300">
        {{ item?.title }}
      </h3>
    </div>
    <div class="h-line" aria-hidden="true" aria-label="decorative"></div>
    <div class="v-line" aria-hidden="true" aria-label="decorative"></div>
    <Icon
      name="ph:diamond-fill"
      aria-hidden="true"
      aria-label="decorative"
      size="30px"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-600"
    />
  </div>
</template>

<script setup>
  const yearFounded = 2004;

  let currentYear = ref(new Date().getFullYear());

  let yearsOfExperience = currentYear.value - yearFounded;

  const { locale } = useI18n();
  const currentLocale = locale.value;

  const { data: aboutSection } = await useAsyncData("about-section", () =>
    queryContent(`/${currentLocale}/home/about-section`).findOne()
  );
</script>

<style scoped>
  .h-line,
  .v-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Adjust for the element's own size */
    background-color: theme("colors.neutral.600");
  }

  .h-line {
    min-width: 100%;
    height: 1px;
  }
  .v-line {
    min-height: 100%;
    width: 1px;
  }
</style>
