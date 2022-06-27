<template>
    <q-page padding>
        <page-row v-for="rowModel in getProfileRepresentation().rowModels" :key="rowModel.id" />
    </q-page>
</template>

<script setup lang="ts">
import { ProfileRepresentation } from 'schala-core';
import PageRow from 'src/sharedcomponents/PageRow.vue';

const props = defineProps<{
    profileRepr: ProfileRepresentation;
}>();

// Methods
const getProfileRepresentation = ():ProfileRepresentation => {
  return props.profileRepr;
}

</script>
