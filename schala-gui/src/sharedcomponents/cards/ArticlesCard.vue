<template>
    <q-card class="my-card">
        <ArticleItem
            v-for="art in articlesModel.articles"
            :key="art.id"
            :article="art"
        />
    </q-card>

    <div class="q-pa-lg flex flex-center">
        <generic-pagination/>
    </div>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core'
import GenericPagination from '../GenericPagination.vue'

defineProps<{
  articlesModel: ArticlesModel;
}>()

</script>