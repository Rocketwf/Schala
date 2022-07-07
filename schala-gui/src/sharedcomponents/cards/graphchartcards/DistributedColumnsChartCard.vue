
<template>
    <simple-card :simple-card-model="cardModel">
        <distributed-columns-chart :distributed-columns-chart-model="cardModel" />
    </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import DistributedColumnsChart from 'src/sharedcomponents/charts/DistributedColumnsChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { DistributedColumnsChartModel } from 'schala-core';

defineProps<{
    cardModel: DistributedColumnsChartModel;
}>();
</script>
