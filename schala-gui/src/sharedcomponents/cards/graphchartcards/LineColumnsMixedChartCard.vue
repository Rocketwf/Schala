<template>
  <simple-card :simple-card-model="cardModel">
    <template #buttons>
      <popup-button
        v-for="popupBtn in cardModel.popupButtons"
        :key="popupBtn.id"
        :popup-button-model="popupBtn"
        badge
      />
      <q-btn
        class="absolute"
        style="top: 0; transform: translateY(-40%)"
        color="primary"
        icon="add"
        label="Expand"
        @click="showDialog"
      />
    </template>
    <template #model>
      <line-columns-mixed-chart :line-columns-mixed-chart-model="cardModel" />
    </template>
  </simple-card>
</template>

<script charset="utf-8" lang="ts" setup>
/**
 * The LineColumnsMixedChartCard is the card template for the line columns mixed chart that is shown in a GraphChartCard.
 */
import LineColumnsMixedChart from '../../charts/LineColumnsMixedChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { LineColumnsMixedChartModel } from 'schala-core';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';
import { useQuasar } from 'quasar';
import LineColumnsMixedChartDialogPluginComponentVue from 'src/sharedcomponents/charts/LineColumnsMixedChartDialogPluginComponent.vue';

const props = defineProps<{
    cardModel: LineColumnsMixedChartModel;
}>();
const $q = useQuasar();
const showDialog = () => 
{
    props.cardModel.toggleExpand();
    props.cardModel.saveFilters();
    $q.dialog({
        component: LineColumnsMixedChartDialogPluginComponentVue,
        componentProps: {
            lineColumnsMixedChartModel: props.cardModel,
        },
    })
        .onOk(() => 
        {
            // console.log('OK')
        })
        .onCancel(() => 
        {
            props.cardModel.restoreFilters();
            props.cardModel.toggleExpand();
        })
        .onDismiss(() => 
        {
            // console.log('I am triggered on both OK and Cancel')
        });
};
</script>
