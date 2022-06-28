<template>
    <q-card class="my-card">
      <articleItem />
    </q-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core'

defineProps<{
  simpleCardModel: SimpleCardModel;
  viewName: ViewName;
}>()

</script>