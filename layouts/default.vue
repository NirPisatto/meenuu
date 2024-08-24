<script setup lang="ts">

</script>

<template>
  <div>
    <div style="min-height: 100vh;">
      <slot />
    </div>
    <v-footer class="d-flex flex-column">
      <div class="text-center w-100 text-body-1 text-primary">
        {{ new Date().getFullYear() }} — <strong>meenuu</strong>
      </div>
    </v-footer>
  </div>

</template>

<style scoped>

</style>