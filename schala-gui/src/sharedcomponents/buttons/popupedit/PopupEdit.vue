<template>
<q-popup-edit v-model="label" class="bg-secondary text-white" >
 <PopupEditInput v-for="tf in getTextFields()" :key="tf.inputId" :label="tf.inputName" :text-field="tf">

 </PopupEditInput>
</q-popup-edit>
</template>
<script setup lang="ts">
import { ObjectSeriesChartModel, TextField } from 'schala-core';
import PopupEditInput from 'src/sharedcomponents/buttons/popupedit/PopupEditInput.vue';

let label: string;
let badge: boolean;

const props = defineProps<{
    //scope:any;
    textField: TextField<ObjectSeriesChartModel>[];
}>();

const getLabel = (): string =>{
  return label;
}

const setLabel = (newLabel: string): void =>{
  label = newLabel;
}

const getBadge = (): boolean =>{
  return badge;
}

const setBadge = (newBadge: boolean): void =>{
  badge = newBadge;
}

const getTextFields = (): TextField<ObjectSeriesChartModel>[] =>{
  return props.textField;
}

</script>
