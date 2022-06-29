<template>
    <q-card class="my-card">
        <ArticleItem
            v-for="art in articlesModel.articles"
            :key="art.id"
            :article="art"
        />
    </q-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core'

defineProps<{
  articlesModel: ArticlesModel;
}>()

</script>