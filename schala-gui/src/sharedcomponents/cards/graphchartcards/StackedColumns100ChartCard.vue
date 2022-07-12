<template>
  <simple-card :simple-card-model="cardModel">
    <template #model>
      <stacked-columns100-chart :stacked-columns-100-chart-model="cardModel" />
    </template>
  </simple-card>
</template>

<script charset="utf-8" lang="ts" setup>
/**
 * The StackedColumnsChartCard is the card template for the stacked columns chart that is shown in a GraphChartCard.
 */
import StackedColumns100Chart from '../../charts/StackedColumns100Chart.vue';
import SimpleCard from '../SimpleCard.vue';
import { StackedColumns100ChartModel } from 'schala-core';

defineProps<{
    cardModel: StackedColumns100ChartModel;
}>();
</script>
