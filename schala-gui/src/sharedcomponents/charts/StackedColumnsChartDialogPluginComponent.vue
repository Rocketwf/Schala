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
      <q-card-section>
        <popup-button
          v-for="popupBtn in stackedColumnsChartModel.popupButtons"
          :key="popupBtn.id"
          :popup-button-model="popupBtn"
        />

        <stacked-columns-chart :stacked-columns-chart-model="stackedColumnsChartModel" />
        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn
            color="red"
            label="close"
            @click="onDialogCancel"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import PopupButton from '../buttons/popupedit/PopupButton.vue';
import StackedColumnsChart from './StackedColumnsChart.vue';
import { StackedColumnsChartModel } from 'schala-core';

defineProps<{
    stackedColumnsChartModel: StackedColumnsChartModel;
}>();

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
</script>
