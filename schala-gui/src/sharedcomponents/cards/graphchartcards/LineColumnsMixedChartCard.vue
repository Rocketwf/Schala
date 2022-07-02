<template>
  <simple-card :simple-card-model="cardModel">
    <line-columns-mixed-chart :line-columns-mixed-chart-model="cardModel"/>
  </simple-card>
</template>

<script charset="utf-8" lang="ts" setup>
/**
 * The LineColumnsMixedChartCard is the card template for the line columns mixed chart that is shown in a GraphChartCard.
 */
import LineColumnsMixedChart from '../../charts/LineColumnsMixedChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { LineColumnsMixedChartModel } from 'schala-core';

defineProps<{
    cardModel: LineColumnsMixedChartModel;
}>();
</script>
