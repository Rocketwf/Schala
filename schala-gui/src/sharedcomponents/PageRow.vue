<template>
    <div class="col-md-4 col-xs-12">
        <component
            v-for="cardModel in rowModel.simpleCardModels"
            :key="cardModel.id"
            :card-model="cardModel"
            :is="getView(rowModel.simpleCardModels[0].viewName)"
        />
    </div>
</template>
<script setup lang="ts">
import { RowModel } from 'schala-core';
import { mapper } from '../sharedcomponents/cards/graphchartcards/SimpleCardMapper';

defineProps<{
    rowModel: RowModel;
}>();
const getView = (viewName: string) => {
    return mapper.get(viewName);
};
</script>
