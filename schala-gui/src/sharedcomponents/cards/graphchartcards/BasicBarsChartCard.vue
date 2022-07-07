<template>
  <simple-card :simple-card-model="cardModel">
    <basic-bars-chart
      :basic-bars-chart-model="cardModel"/>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import SimpleCard from '../SimpleCard.vue';
import { BasicBarsChartModel } from 'schala-core';
import BasicBarsChart from 'src/sharedcomponents/charts/BasicBarsChart.vue';
defineProps<{
    cardModel: BasicBarsChartModel;
}>();
</script>