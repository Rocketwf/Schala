<template>
  <simple-card :simple-card-model="cardModel" >
    <basic-columns-chart :basic-columns-chart-model="cardModel" />
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import BasicColumnsChart from '../../charts/BasicColumnsChart.vue';
import { BasicColumnsChartModel } from 'schala-core';
import SimpleCard from '../SimpleCard.vue';

defineProps<{
    cardModel: BasicColumnsChartModel;
}>();
</script>