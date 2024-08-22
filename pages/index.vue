<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "homaPage",
  layout: "default",
});
</script>

<template>
  <div>
    <v-container>
      <v-row content="center">
        <v-col cols="12" class="d-flex flex-row justify-center">
          <h1 class="text-primary mt-12 pt-12">Coming Soon</h1>
        </v-col>
        <v-col cols="12" class="d-flex flex-row justify-center">
          <v-btn
            to="/merchants/demo-shop"
            class="mt-6"
            color="primary"
            variant="outlined"
          >
            <v-icon>mdi-store</v-icon> View Demo Shop
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
