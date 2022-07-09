<template>
    <div :class="'col-md-' + simpleCardModel.colWidth + ' col-xs-12'">
        <q-card class="my-card" style="height: 100%">
            <q-card-section>
                <div class="q-my-md text-h6 q-mb-xs">{{ simpleCardModel.title }}</div>
                <q-item-label caption>{{ simpleCardModel.sub }}</q-item-label>
                <slot name="buttons" />

            </q-card-section>

            <q-card-section class="justify-center" style="height: 80%">
                <slot name="model" />
            </q-card-section>
        </q-card>
    </div>
</template>
<script setup lang="ts" charset="utf-8">
import { SimpleCardModel } from 'schala-core';
defineProps<{
    simpleCardModel: SimpleCardModel;
}>();
</script>
