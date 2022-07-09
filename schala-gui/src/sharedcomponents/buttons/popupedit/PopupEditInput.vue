<template>
    <q-input dark color="white" v-model="input" @update:model-value="update" :label="getInputName" dense autofocus>
        <template #append>
            <q-icon name="edit" />
        </template>
    </q-input>
</template>
<script setup lang="ts">
import { ArticlesModel, Filterable, ObjectSeriesChartModel, Field } from 'schala-core';
import { ref } from 'vue';

const props = defineProps<{
    textField: Field<number | string, ObjectSeriesChartModel | ArticlesModel>;
    models: Filterable<ObjectSeriesChartModel | ArticlesModel>[];
}>();

const getInputName = (): string => {
    return props.textField.inputName;
};

const getInputId = (): string => {
    return props.textField.inputId;
};
getInputId;

const getInputValue = () => {
    return props.textField.inputValue;
};
const input = ref(getInputValue());

const handleInput = (): void => {
    if (input.value) {
        props.textField.handleInput();
    }
};
const update = (): void => {
    handleInput();
};
</script>