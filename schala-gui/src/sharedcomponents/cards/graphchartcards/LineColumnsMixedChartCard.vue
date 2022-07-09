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
          <line-columns-mixed-chart :line-columns-mixed-chart-model="cardModel"/>
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

defineProps<{
    cardModel: LineColumnsMixedChartModel;
}>();
</script>
