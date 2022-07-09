<template>
    <div class="row q-gutter-y-md q-col-gutter-md justify-center">
        <div class="col-md-12">
            <q-space />

            <div class="col-md-12">
                <q-checkbox
                    v-for="checkBox in rowModel.checkBoxes"
                    v-model="checkBox.inputValue"
                    :key="checkBox.inputId"
                    label="Scale up number of publications according to the scholar with highest entries"
                    @update:model-value="checkBox.handleInput()"
                />
                <q-separator vertical inset />
            </div>
            <div class="col-md-2 col-xs-12 vertical-middle">
                <popup-button
                    v-for="popupBtn in rowModel.popupButtons"
                    :key="popupBtn.id"
                    :popup-button-model="popupBtn"
                />
            </div>
        </div>

        <component
            v-for="cardModel in rowModel.simpleCardModels"
            :key="cardModel.id"
            :card-model="cardModel"
            :is="getView(cardModel.viewName)"
        />
    </div>
</template>
<script setup lang="ts">
import { RowModel } from 'schala-core';
import { mapper } from '../sharedcomponents/cards/graphchartcards/SimpleCardMapper';
import PopupButton from './buttons/popupedit/PopupButton.vue';

defineProps<{
    rowModel: RowModel;
}>();
const getView = (viewName: string) => {
    return mapper.get(viewName);
};
</script>
