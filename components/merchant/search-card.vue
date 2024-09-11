<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "search-card",
})
</script>

<template>
  <v-card id="search-card" class="rounded-lg" elevation="0" variant="outlined">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <p class="mb-2">
            {{ $t('merchant.find_your_favorite_food') }}
          </p>
          <slot></slot>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
#search-card {
  border: none;
  background-color: #5581B04D;
  p{
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 1px;
    text-align: left;
  }
}
</style>