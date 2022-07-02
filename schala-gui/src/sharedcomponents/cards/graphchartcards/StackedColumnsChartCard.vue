<template>
    <simple-card :simple-card-model="cardModel">
        <stacked-columns-chart :stacked-columns-chart-model="cardModel" />
    </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import StackedColumnsChart from '../../charts/StackedColumnsChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { StackedColumnsChartModel } from 'schala-core';

defineProps<{
    cardModel: StackedColumnsChartModel;
}>();
</script>
