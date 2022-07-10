<template>
    <div v-for="som in selectOptionsModels" :key="som.inputId" class="col-md-2 col-xs-12 vertical-middle">
        <q-select
            standout
            v-model="som.inputValue"
            :options="som.possibleOptions"
            :label="som.inputName"
            @update:model-value="som.handleInput()"
        />
    </div>
</template>
<script lang="ts" setup>
import { ArticlesModel, SelectOptions } from 'schala-core';
defineProps<{
    selectOptionsModels: SelectOptions<string, ArticlesModel>[];
}>();
</script>
