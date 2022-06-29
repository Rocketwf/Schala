<template>
    <simple-card :simple-card-model="props.articlesModel">
        <ArticleItem
            v-for="art in props.articlesModel.articles"
            :key="art.id"
            :article="art"
        />
    </simple-card>
    <div class="q-pa-lg flex flex-center">
        
    </div>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core'
import GenericPagination from '../GenericPagination.vue'
import ArticleItem from '../../mainlayout/profilepage/ArticleItem.vue'
import SimpleCard from './SimpleCard.vue'

const props = defineProps<{
    articlesModel: ArticlesModel,
}>()

</script>