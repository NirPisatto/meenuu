<script lang="ts">
import { defineComponent } from "vue";

type Banner = {
  src: string;
};

export default defineComponent({
  name: "banner-windows",
  data: () => ({
    length: 3,
    window: 0,
  }),
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
  <v-window
      v-model="window"
      class="rounded-lg"
  >
    <v-window-item>
      <v-img src="/images/demo_banner_img.jpeg" :height="height" cover>
      </v-img>
    </v-window-item>
    <v-window-item>
      <v-card class="d-flex justify-center align-center px-3 py-3" elevation="0">
        <v-row class="fill-height">
          <v-col cols="5">
            <v-img src="/images/demo_banner_img.jpeg" height="100%" class="rounded-lg" cover></v-img>
          </v-col>
          <v-col cols="7" class="pl-1">
            <v-card-subtitle class="text-caption px-0 mt-2 text-primary">
              ID : 0003
            </v-card-subtitle>
            <v-card-title class="text-h6 px-0 font-weight-regular text-black">
              item.name
            </v-card-title>

            <v-card-text class="px-3 mt-3">
              <v-row>
                <span class="text-subtitle-1 font-weight-regular">
                  13 $
                </span>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<style scoped></style>
