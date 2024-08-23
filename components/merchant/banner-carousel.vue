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
    showArrows: {
      type: Boolean,
      default: false,
    },
    hideDelimiters: {
      type: Boolean,
      default: false,
    }
  },
});
</script>

<template>
  <v-carousel
    :height="height"
    class="rounded-lg"
    :show-arrows="showArrows"
    :hide-delimiters="hideDelimiters"
    hide-delimiter-background
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
