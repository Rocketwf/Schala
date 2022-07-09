<template>
    <q-btn
        :fab="badge"
        :class="badge ? 'absolute' : 'full-width'"
        :style="badge ? 'top: 0; right: 12px; transform: translateY(-20%);' : ''"
        :label="popupButtonModel.label"
        color="primary"
        icon="people"
    >
        <q-popup-edit @before-hide="popupButtonModel.handleAll()" v-model="buttonModel" class="bg-secondary text-white">
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
import { ObjectSeriesChartModel, PopupEditButton } from 'schala-core';
import { ref } from 'vue';
defineProps<{
    popupButtonModel: PopupEditButton<ObjectSeriesChartModel>;
    badge?: boolean;
}>();

const buttonModel = ref('');
</script>
