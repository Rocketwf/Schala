<template>
    <q-page padding>
        <page-row v-for="rowModel in getComparisonRepresentation().rowModels" :key="rowModel.id" :row-model="rowModel" />
    </q-page>
</template>

<script setup lang="ts">
import { ComparisonRepresentation } from 'schala-core';
import PageRow from 'src/sharedcomponents/PageRow.vue';
const props = defineProps<{
    comparisonRepr: ComparisonRepresentation;
}>();
// Methods
const getComparisonRepresentation = (): ComparisonRepresentation => {
    return props.comparisonRepr;
};
console.log(getComparisonRepresentation().rowModels);
</script>
