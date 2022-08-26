<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <popup-button
        v-for="popupBtn in basicColumnsChartModel.popupButtons"
        :key="popupBtn.id"
        :popup-button-model="popupBtn"
      />
      <basic-columns-chart :basic-columns-chart-model="basicColumnsChartModel" />

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="red"
          label="close"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import PopupButton from '../buttons/popupedit/PopupButton.vue';
import { BasicColumnsChartModel } from 'schala-core';
import BasicColumnsChart from './BasicColumnsChart.vue';

defineProps<{
    basicColumnsChartModel: BasicColumnsChartModel;
}>();

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();


</script>
