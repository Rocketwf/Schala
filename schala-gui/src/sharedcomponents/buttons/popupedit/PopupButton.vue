<template>
  <q-btn
    :class="badge ? 'absolute' : 'full-width'"
    :style="badge ? 'top: 0; right: 12px; transform: translateY(-40%);' : ''"
    :label="popupButtonModel.label"
    color="primary"
    :icon="popupButtonModel.icon"
  >
    <q-popup-edit
      @before-hide="handlerWrapper()"
      v-model="buttonModel"
      class="bg-secondary text-white"
    >
      <q-input
        v-for="input in popupButtonModel.inputs"
        :key="input.inputId"
        :label="input.inputName"
        dark
        color="white"
        v-model="input.inputValue"
        dense
        autofocus
        @blur="input.handleInput()"
      >
        <template #append>
          <q-icon name="edit" />
        </template>
      </q-input>
    </q-popup-edit>
  </q-btn>
</template>
<script setup lang="ts">
import { Message, STATUS, ArticlesModel, ObjectSeriesChartModel, PopupEditButton } from 'schala-core';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();

const props = defineProps<{
    popupButtonModel: PopupEditButton<number | string, ArticlesModel | ObjectSeriesChartModel>;
    badge?: boolean;
}>();

const buttonModel = ref('');
const handlerWrapper = () => 
{
    const msgs: Message[] = props.popupButtonModel.handleAll();
    for (const msg of msgs) 
    {
        if (msg.status === STATUS.FAIL) 
        {
            $q.notify({
                type: 'negative',
                message: msg.message,
            });
        }
    }
};
</script>
