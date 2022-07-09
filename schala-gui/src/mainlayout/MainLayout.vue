<template>
  <q-layout view="hHr lpR ffr">

    <sticky-header-vue />


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import StickyHeaderVue from './header/StickyHeader.vue';
</script>
