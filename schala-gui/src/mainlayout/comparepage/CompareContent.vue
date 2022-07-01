<template>
    <q-page padding>
        <page-row v-for="rowModel in getComparisonRepresentation().rowModels" :key="rowModel.id" :row-model="rowModel" />
    </q-page>
</template>

<script setup lang="ts">
/**
 * Holds the visualisation of scholar comparison.
 */
import { ComparisonRepresentation } from 'schala-core';
import PageRow from 'src/sharedcomponents/PageRow.vue';

const props = defineProps<{
    comparisonRepr: ComparisonRepresentation;
}>();

/**
 * Getter method for the ComparisonRepresentation.
 */
const getComparisonRepresentation = (): ComparisonRepresentation => {
    return props.comparisonRepr;
};
</script>