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
import { ChartOptionsModel, CheckBox, Filterable} from 'schala-core';
import { ref } from 'vue';

const label: string = 'Scale up number of publications according to the scholar with highest entries';
let scale_citations = ref(false);

const props = defineProps<{
  checkBox: CheckBox<ChartOptionsModel>,
  models: Filterable <ChartOptionsModel>[]
}>()

const getLabel = (): string => {
  return label;
}

const getCheckBox = (): CheckBox<ChartOptionsModel> => {
  return props.checkBox;
}

const update = (): void => {
  getCheckBox().handleInput(scale_citations.value, props.models);
}

</script>
