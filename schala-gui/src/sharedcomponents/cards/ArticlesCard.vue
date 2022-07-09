<template>
    <simple-card :simple-card-model="props.cardModel">
        <template #buttons>
            <popup-button
                v-for="popupBtn in cardModel.popupButtons"
                :key="popupBtn.id"
                :popup-button-model="popupBtn"
                badge
            />
        </template>
        <template #model>
            <article-item v-for="art in props.cardModel.articles" :key="art.title" :article="art" />
        </template>
        <template #pagination>
            <experimental-generic-pagination
                :pagination-model="cardModel.pagination"
            />
        </template>
    </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticlesModel } from 'schala-core';
import ArticleItem from '../../mainlayout/profilepage/ArticleItem.vue';
import SimpleCard from './SimpleCard.vue';
import PopupButton from '../buttons/popupedit/PopupButton.vue';
import ExperimentalGenericPagination from '../ExperimentalGenericPagination.vue';

const props = defineProps<{
    cardModel: ArticlesModel;
}>();
</script>
