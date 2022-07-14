<template>
  <simple-card :simple-card-model="cardModel">
    <template #buttons />
    <template #model>
      <HeatmapChart :heatmap-chart-model="cardModel" />
    </template>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import HeatmapChart from '../../charts/HeatmapChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { HeatmapChartModel } from 'schala-core';

defineProps<{
    cardModel: HeatmapChartModel;
}>();
</script>