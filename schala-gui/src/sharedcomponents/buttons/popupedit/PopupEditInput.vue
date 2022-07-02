<template>
  <q-input dark color="white" v-model="input" @update:model-value="update" :label="getInputName" dense autofocus >
        <template #append>
          <q-icon name="edit" />
        </template>
  </q-input>
</template>
<script setup lang="ts">
import { ObjectSeriesChartModel, SimpleCardModel, TextField } from 'schala-core';
import { ref } from 'vue';

const props = defineProps<{
    textField: TextField<ObjectSeriesChartModel>;
    //getSimpleCardModel: () => SimpleCardModel;
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
 /* if( typeof value === 'string') {
     props.textField.handleInput(value, props.textField.filter, props.getSimpleCardModel())
  }
  */

}
</script>
