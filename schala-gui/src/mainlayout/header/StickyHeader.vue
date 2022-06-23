<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/wisteria_Background_only_plant.png">
          </q-avatar>
          schala
        </q-toolbar-title>
        <q-input dark dense standout v-model="text" input-class="text-left" class="float-right q-mb-sm q-mt-sm">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>

      <q-tabs align="center" animated swipeable class="desktop-hide">
        <q-route-tab to="/profile/search" label="Search Results" icon="search" />
        <q-route-tab to="/profile/show" label="Profile" icon="person" />
        <q-route-tab to="/profile/compare" label="Compare" icon="people" />
      </q-tabs>
      <q-tabs align="center" animated swipeable class="mobile-hide" inline-label>
        <q-route-tab to="/profile/search" label="Search Results" icon="search" />
        <q-route-tab to="/profile/show" label="Profile" icon="person" />
        <q-route-tab to="/profile/compare" label="Compare" icon="people" />
      </q-tabs>
    </q-header>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  let text = ref('')
</script>
