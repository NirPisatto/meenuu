<script lang="ts">
import { defineComponent } from "vue";

type Banner = {
  src: string;
};

export default defineComponent({
  name: "banner-carousel",
  props: {
    banners: {
      type: Array<Banner>,
      required: true,
    },
    height: {
      type: String,
      default: "130px",
    },
  },
});
</script>

<template>
  <v-carousel
    :height="height"
    class="rounded-lg"
    :show-arrows="false"
    hide-delimiters
  >
    <v-carousel-item
      v-for="(item, i) in banners"
      :key="i"
      :src="item.src"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>

<style scoped></style>
