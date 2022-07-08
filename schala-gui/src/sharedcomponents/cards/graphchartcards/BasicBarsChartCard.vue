<template>
  <simple-card :simple-card-model="cardModel">
      <template #buttons>
          <popup-button
              v-for="popupBtn in cardModel.popupButtons"
              :key="popupBtn.id"
              :popup-button-model="popupBtn"
              :data="cardModel"
          />
      </template>
      <template #model>
          <basic-bars-chart :basic-bars-chart-model="cardModel"/>
      </template>
  </simple-card>
</template>
<script charset="utf-8" lang="ts" setup>
import SimpleCard from '../SimpleCard.vue';
import { BasicBarsChartModel } from 'schala-core';
import BasicBarsChart from 'src/sharedcomponents/charts/BasicBarsChart.vue';
import PopupButton from '../../buttons/popupedit/PopupButton.vue';

defineProps<{
    cardModel: BasicBarsChartModel;
}>();
</script>