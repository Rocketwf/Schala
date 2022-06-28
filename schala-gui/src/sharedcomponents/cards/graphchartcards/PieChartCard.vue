<template>
  <simple-card :simple-card-model="cardModel">
    <pie-chart :pie-chart-model="cardModel" />
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import PieChart from '../../charts/PieChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { PieChartModel } from 'schala-core';

defineProps<{
    cardModel: PieChartModel;
}>();
</script>
