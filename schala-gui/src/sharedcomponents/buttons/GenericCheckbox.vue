<template>
<div class="col-md-12">
  <q-space />
  <div class="col-md-2 col-xs-12 vertical-middle">
    <q-checkbox
      @click="update"
      v-model="scale_citations"
      :label="getLabel()"
      />
  </div>
</div>
</template>
<script setup lang="ts">
import { ChartOptionsModel, CheckBox} from 'schala-core';
import { ref } from 'vue';

const label: string = 'Scale up number of publications according to the scholar with highest entries';
let scale_citations = ref(false);
let model: ChartOptionsModel;


const props = defineProps<{
  checkBox: CheckBox<ChartOptionsModel>,
}>()

const getLabel = (): string => {
  return label;
}

const getModel = (): ChartOptionsModel => {
  return model;
}

const setModel = (newModel: ChartOptionsModel): void=> {
  model = newModel;
}

const getCheckBox = (): CheckBox<ChartOptionsModel> => {
  return props.checkBox;
}

const update = (): void => {
    /*if(scale_citations.value){
      getCheckBox().handleInput(scale_citations.value,scale, getModel());
    }
    */
}

</script>
