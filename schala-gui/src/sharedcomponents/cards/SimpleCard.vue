<template>
  <div :class="'col-md-' + simpleCardModel.colWidth + ' col-xs-12'">
    <q-card
      class="my-card"
      style="height: 100%"
    >
      <q-card-section>
        <div class="col-md-2 col-xs-12">
          <div class="text-h6 q-mb-xs">
            {{ simpleCardModel.title }}
          </div>
          <q-item-label caption>
            {{ simpleCardModel.sub }}
          </q-item-label>
        </div>
        <q-space />

        <slot name="selectOptions" />
        <div class="col-md-1 col-xs-12 vertical-middle">
          <slot name="buttons" />
        </div>
      </q-card-section>

      <q-card-section class="justify-center">
        <slot name="model" />
      </q-card-section>
      <q-card-section class="justify-center">
        <slot name="pagination" />
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
