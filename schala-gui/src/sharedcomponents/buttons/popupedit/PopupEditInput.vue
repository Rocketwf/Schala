<template>
  <q-input dark color="white" v-model="input" @update:model-value="update" :label="getInputName" dense autofocus >
        <template #append>
          <q-icon name="edit" />
        </template>
  </q-input>
</template>
<script setup lang="ts">
import { ArticlesModel, Filter, Filterable, ObjectSeriesChartModel, TextField } from 'schala-core';
import { ref } from 'vue';

const props = defineProps<{
    textField: TextField<ObjectSeriesChartModel | ArticlesModel>;
    models: Filterable <ObjectSeriesChartModel | ArticlesModel>[];
}>();


const getInputName = (): string =>{
  return props.textField.inputName
}

const getInputId = (): string =>{
  return props.textField.inputId
}

const getInputValue = (): string =>{
  return props.textField.inputValue
}
const input = ref(getInputValue());

const handleInput = (value: string): void =>{
 if(value) {
     props.textField.handleInput(input.value, props.models)
  }
}
const update = (): void =>{
  handleInput(input.value);
}
</script>
