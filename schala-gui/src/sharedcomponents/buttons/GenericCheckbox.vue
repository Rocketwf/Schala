<template>
<div class="col-md-12">
  <q-space />
  <div class="col-md-2 col-xs-12 vertical-middle">
    <q-checkbox
      v-model="scale_citations"
      :label="label"
      />
  </div>
</div>
</template>
<script setup lang="ts">
import { Filter } from 'http-proxy-middleware';
import { ChartOptionsModel, CheckBox, Filterable } from 'schala-core';
import { computed, ref } from 'vue';

const label: string = 'Scale up number of publications according to the scholar with highest entries';
let scale_citations = ref(true);
const watcher = computed(() => {
  return scale_citations.value ? true : false
})
const props = defineProps<{
  checkBox: CheckBox<ChartOptionsModel>,
}>()

const getLabel = (): string => {
  return label;
}

const getCheckBox = (): CheckBox<ChartOptionsModel> => {
  return props.checkBox;
}

const setCheckBox = (newCheckBox: CheckBox<ChartOptionsModel> ): void => {
  //props.checkBox = newCheckBox;
}

</script>
