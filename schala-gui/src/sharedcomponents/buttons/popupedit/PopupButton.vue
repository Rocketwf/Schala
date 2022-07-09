<template>
    <q-btn
        fab
        :label="popupButtonModel.label"
        color="primary"
        icon="people"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-20%)"
    >
        <q-popup-edit @before-hide="popupButtonModel.handleAll([props.data])" v-model="buttonModel" class="bg-secondary text-white">
            <q-input
                v-for="input in popupButtonModel.inputs"
                :key="input.inputName"
                :label="input.inputName"
                dark
                color="white"
                v-model="input.inputValue"
                dense
                autofocus
                @blur="input.handleInput([props.data])"
            >
                <template #append>
                    <q-icon name="edit" />
                </template>
            </q-input>
        </q-popup-edit>
    </q-btn>
</template>
<script setup lang="ts">
import { ArticlesModel, ObjectSeriesChartModel, PopupEditButton } from 'schala-core';
import { ref } from 'vue';


const props = defineProps<{
    popupButtonModel: PopupEditButton<ObjectSeriesChartModel | ArticlesModel>;
    data: ObjectSeriesChartModel | ArticlesModel;
}>();

const buttonModel = ref('');
</script>
