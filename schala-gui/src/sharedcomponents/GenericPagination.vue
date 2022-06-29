<template>
    <div class="q-pa-lg flex flex-center" @click="switchPage">
        <q-pagination v-model="newPageValue" :max="maxValue" :max-pages="5" boundary-links />
    </div>
</template>
<script setup charset="utf-8" lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    handleSwitch: (value: number) => void;
    maxValue: number;
    currentPage: number;
}>();

const newPageValue = ref(props.currentPage);

const getNewPageValue = (): number => {
    return newPageValue.value;
};
const switchPage = () => {
  props.handleSwitch(getNewPageValue());
}
</script>
