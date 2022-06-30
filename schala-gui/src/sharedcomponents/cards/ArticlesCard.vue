<template>
    <simple-card :simple-card-model="props.cardModel">
            <article-item
                v-for="art in getArticles()"
                :key="art.id"
                :article="art"
            />  
    </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel, Article } from 'schala-core'
import ArticleItem from '../../mainlayout/profilepage/ArticleItem.vue'
import SimpleCard from './SimpleCard.vue'

const props = defineProps<{
    cardModel: ArticlesModel,
}>()

const getArticles = (): Article[] => {
  return props.cardModel.articles.slice(0, 10);
}

</script>
