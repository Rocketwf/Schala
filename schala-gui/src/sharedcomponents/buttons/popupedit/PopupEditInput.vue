<template>
  <q-input dark color="white" v-model="input" @update:model-value="update" :label="props.label" dense autofocus >
        <template v-slot:append>
          <q-icon name="edit" />
        </template>
  </q-input>
</template>
<script setup lang="ts">
import { ObjectSeriesChartModel, TextField } from 'schala-core';
import { ref } from 'vue';

const props = defineProps<{
    textField: TextField<ObjectSeriesChartModel>;
    label: string;
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

const update = (value: string | number | null): void =>{
   //props.textField.inputValue
    console.log('YARRAK')
}
</script>
