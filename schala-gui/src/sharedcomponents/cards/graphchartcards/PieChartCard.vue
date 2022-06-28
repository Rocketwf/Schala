<template>
    <q-card class="my-card" style="height: 100%">
        <q-card-section>
            <div class="text-h6 q-mb-xs">{{ cardModel.title }}</div>
        </q-card-section>
        <q-item-label caption>{{ cardModel.sub }}</q-item-label>

        <q-card-section class="flex flex-center justify-center" style="height: 80%">
            <pie-chart :pie-chart-model="cardModel" />
        </q-card-section>
    </q-card>
</template>
<script charset="utf-8" lang="ts" setup>
import PieChart from '../../charts/PieChart.vue';
import { PieChartModel } from 'schala-core';

defineProps<{
    cardModel: PieChartModel;
}>();
</script>
