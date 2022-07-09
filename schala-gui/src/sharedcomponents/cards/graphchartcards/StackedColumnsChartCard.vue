<template>
    <simple-card :simple-card-model="cardModel">
        <template #buttons>
            <popup-button
                v-for="popupBtn in cardModel.popupButtons"
                :key="popupBtn.id"
                :popup-button-model="popupBtn"
                badge
            />
        </template>
        <template #model>
            <stacked-columns-chart :stacked-columns-chart-model="cardModel" />
        </template>
    </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import StackedColumnsChart from '../../charts/StackedColumnsChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { StackedColumnsChartModel } from 'schala-core';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';

defineProps<{
    cardModel: StackedColumnsChartModel;
}>();
</script>
