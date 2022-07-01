<template>
  <simple-card :simple-card-model="cardModel">
    <line-columns-mixed-chart :line-columns-mixed-chart-model="cardModel"/>
  </simple-card>
</template>

<script charset="utf-8" lang="ts" setup>
import LineColumnsMixedChart from '../../charts/LineColumnsMixedChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { LineColumnsMixedChartModel } from 'schala-core';

defineProps<{
    cardModel: LineColumnsMixedChartModel;
}>();
</script>
