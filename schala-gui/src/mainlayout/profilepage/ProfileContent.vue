<template>
  <q-page padding>
    <page-row v-for="pageRow in getProfileRepresentation().rowModels"
    v-bind:key="pageRow.id" />

  </q-page>

</template>

<script setup lang="ts">

import { ProfileRepresentation } from "../../../../core/representations/ProfileRepresentation";
import PageRow from "src/sharedcomponents/PageRow.vue";


const props = defineProps<{
      profileRepr: ProfileRepresentation
}>()

// Methods
const getProfileRepresentation = () => {
  return props.profileRepr;
}

</script>
