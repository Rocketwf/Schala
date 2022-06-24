<template>
  <q-layout view="hHr lpR ffr">

    <sticky-header-vue />


    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Schala: A Scholar profile analyzer</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import StickyHeaderVue from './header/StickyHeader.vue';
</script>
