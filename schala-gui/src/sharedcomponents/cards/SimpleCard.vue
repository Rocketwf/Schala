<template>
    <q-card class="my-card">
      <SimpleCardModel />
    </q-card>
</template>

<script setup charset="utf-8" lang="ts">
import { SimpleCardModel } from 'schala-core'

defineProps<{
  simpleCardModel: SimpleCardModel;
  viewName: ViewName;
}>()

enum ViewName {
  PieChartCard = 'PieChartCard',
  BasicColumnsChartCard = 'BasicColumnsChartCard',
  DistributedColumnsChartCard = 'DistributedColumnsChartCard',
  LineColumnsMixedChartCard = 'LineColumnsMixedChartCard',
  StackedColumns100ChartCard = 'StackedColumns100ChartCard',
  StackedColumnsChartCard = 'StackedColumnsChartCard',
  ExpertisesCard = 'ExpertisesCard',
  ArticlesCard = 'ArticlesCard'
}
</script>