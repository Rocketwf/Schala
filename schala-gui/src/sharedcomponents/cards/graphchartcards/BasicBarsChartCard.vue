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
        v-if="cardModel.isShowingExpandButton"
        class="absolute"
        style="top: 0; transform: translateY(-40%)"
        color="primary"
        icon="add"
        label="Expand"
        @click="showDialog"
      />
    </template>
    <template #model>
      <basic-bars-chart :basic-bars-chart-model="cardModel" />
    </template>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import SimpleCard from '../SimpleCard.vue';
import { BasicBarsChartModel } from 'schala-core';
import BasicBarsChart from 'src/sharedcomponents/charts/BasicBarsChart.vue';
import BasicBarsChartDialogPluginComponent from 'src/sharedcomponents/charts/BasicBarsChartDialogPluginComponent.vue';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';
import { useQuasar } from 'quasar';

const props = defineProps<{
    cardModel: BasicBarsChartModel;
}>();

const $q = useQuasar();
const showDialog = () => 
{
    props.cardModel.toggleExpand();
    props.cardModel.saveFilters();
    $q.dialog({
        component: BasicBarsChartDialogPluginComponent,
        componentProps: {
            basicBarsChartModel: props.cardModel,
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
