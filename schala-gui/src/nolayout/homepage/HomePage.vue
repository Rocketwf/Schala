<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-pa-md row justify-center">
      <div
        class="col-8 col-xs-12 text-center"
        style="margin: 0 auto"
      >
        <q-img
          src="../../assets/logo.png"
          style="height: 220px; max-width: 400px"
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8 col-xs-10">
        <search-component />
      </div>
    </div>
  </q-layout>
</template>
<script setup lang="ts">
import SearchComponent from './SearchComponent.vue';
</script>
