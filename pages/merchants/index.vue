<script lang="ts">
import {defineComponent} from 'vue'
definePageMeta({
  layout: 'merchant',
})


export default defineComponent({
  name: "merchantDetailPage",
  data() {
    return {
      merchant: {
        name: 'MeeNuu Demo Merchant',
      }
    }
  },
})
</script>

<template>
  <div>
      <v-row>
        <v-col cols="12">
          <v-app-bar :elevation="0" class="px-3">
            <template v-slot:prepend>
              <v-avatar>
                <v-img  alt="merchant logo" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"></v-img>
              </v-avatar>
            </template>
            <v-app-bar-title class="text-primary">
              {{merchant.name}}
            </v-app-bar-title>
            <template v-slot:append>
              <v-btn color="primary" icon="mdi-cart-outline"></v-btn>
            </template>
          </v-app-bar>
        </v-col>
      </v-row>
  </div>
</template>

<style scoped>

</style>