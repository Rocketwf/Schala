<template>
    <simple-card :simple-card-model="props.cardModel">
            <article-item
                v-for="art in props.cardModel.articles" 
                :key="art.title"
                :article="art"
            />  
    </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core'
import ArticleItem from '../../mainlayout/profilepage/ArticleItem.vue'
import SimpleCard from './SimpleCard.vue'

const props = defineProps<{
    cardModel: ArticlesModel,
}>()

</script>
