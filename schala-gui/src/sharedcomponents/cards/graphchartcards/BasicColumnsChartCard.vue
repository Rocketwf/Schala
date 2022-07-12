<template>
  <simple-card :simple-card-model="cardModel">
    <template #buttons>
      <popup-button
        v-for="popupBtn in cardModel.popupButtons"
        :key="popupBtn.id"
        :popup-button-model="popupBtn"
        badge
      />
    </template>
    <template #model>
      <basic-columns-chart :basic-columns-chart-model="cardModel" />
    </template>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import BasicColumnsChart from '../../charts/BasicColumnsChart.vue';
import { BasicColumnsChartModel } from 'schala-core';
import SimpleCard from '../SimpleCard.vue';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';

defineProps<{
    cardModel: BasicColumnsChartModel;
}>();
</script>
