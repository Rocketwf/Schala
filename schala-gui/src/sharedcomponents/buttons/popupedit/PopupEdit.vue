<template>
    <q-popup-edit v-model="label" class="bg-secondary text-white">
        <popup-edit-input
            :models="models"
            v-for="tf in getTextFields()"
            :key="tf.inputId"
            :label="tf.inputName"
            :text-field="tf"
        />
    </q-popup-edit>
</template>
<script setup lang="ts">
import { ArticlesModel, Filterable, ObjectSeriesChartModel, TextField } from 'schala-core';
import PopupEditInput from 'src/sharedcomponents/buttons/popupedit/PopupEditInput.vue';

let label: string;
let badge: boolean;

const props = defineProps<{
    textField: TextField<ObjectSeriesChartModel | ArticlesModel>[];
    models: Filterable<ObjectSeriesChartModel | ArticlesModel>[];
}>();

const getLabel = (): string => {
    return label;
};
getLabel;

const setLabel = (newLabel: string): void => {
    label = newLabel;
};
setLabel;

const getBadge = (): boolean => {
    return badge;
};
getBadge;

const setBadge = (newBadge: boolean): void => {
    badge = newBadge;
};
setBadge;

const getTextFields = (): TextField<ObjectSeriesChartModel>[] => {
    return props.textField;
};
</script>
