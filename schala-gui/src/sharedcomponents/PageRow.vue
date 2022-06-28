<template>
    <div class="col-md-4 col-xs-12">
        <component
            v-for="cardModel in rowModel.simpleCardModels"
            :key="cardModel.id"
            :card-model="cardModel as PieChartModel"
            :is="getView(rowModel.simpleCardModels[0].viewName)"
        />
    </div>
</template>
<script setup lang="ts">
import { RowModel, PieChartModel } from 'schala-core';
import { mapper } from '../sharedcomponents/cards/graphchartcards/SimpleCardMapper';
import PieChartCard from '../sharedcomponents/cards/graphchartcards/PieChartCard.vue';
const props = defineProps<{
    rowModel: RowModel;
}>();
const getView = (viewName: string) => {
    mapper.get(viewName);

    return PieChartCard;
};
</script>
