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
      <distributed-columns-chart :distributed-columns-chart-model="cardModel" />
    </template>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import DistributedColumnsChart from 'src/sharedcomponents/charts/DistributedColumnsChart.vue';
import SimpleCard from '../SimpleCard.vue';
import { DistributedColumnsChartModel } from 'schala-core';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';
import { useQuasar } from 'quasar';
import DistributedColumnsChartDialogPluginComponentVue from 'src/sharedcomponents/charts/DistributedColumnsChartDialogPluginComponent.vue';

const props = defineProps<{
    cardModel: DistributedColumnsChartModel;
}>();
const $q = useQuasar();
const showDialog = () => 
{
    props.cardModel.toggleExpand();
    props.cardModel.saveFilters();
    $q.dialog({
        component: DistributedColumnsChartDialogPluginComponentVue,
        componentProps: {
            distributedColumnsChartModel: props.cardModel,
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