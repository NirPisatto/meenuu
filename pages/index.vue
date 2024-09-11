<script lang="ts" setup>
const {locale, setLocale} = useI18n()

definePageMeta({
  layout: "default",
});
</script>

<script lang="ts">
export default {
  name: "homePage",
};
</script>

<template>
  <div>
    <v-container>
      <v-row content="center">
        <v-col cols="12" class="d-flex flex-row justify-center">
          <h1 class="text-primary mt-12 pt-12">Coming Soon</h1>
        </v-col>
        <v-col cols="12" class="d-flex flex-row justify-center">
          <v-btn to="/merchants/freedomhealth" class="mt-6" color="primary" variant="outlined">
            <v-icon>mdi-store</v-icon>
            View Demo Shop
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>
