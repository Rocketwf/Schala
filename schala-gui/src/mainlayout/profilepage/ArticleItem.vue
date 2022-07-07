<template>
  <q-item clickable>
    <q-item-section>
      <q-item-label>{{ article.title }}</q-item-label>
      <q-item-label caption lines="2">Published at {{article.venue}}</q-item-label>
    </q-item-section>

    <div class="mobile-hide">
      <q-item class="vertical-middle">
        <q-item-section side>
          <q-item-label >Year: <span class="text-bold inline">{{article.year}}</span></q-item-label>
        </q-item-section>
        <q-item-section class="q-mr-xl" side>
          <q-item-label >Cited: <span class="text-bold inline">{{article.citation}}</span></q-item-label>
        </q-item-section>
      </q-item>
      <q-space />
    </div>

    <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">

            <article-item-button v-slot="slotProps" :icon="'books'">
              <cite-button :bibtex="props.article.url" :button-icon="slotProps.icon"/>
            </article-item-button>

            <article-item-button v-slot="slotProps" :icon="'share'">
              <share-button :url="props.article.url" :button-icon="slotProps.icon"/>
            </article-item-button>

            <article-item-button v-slot="slotProps" :icon="'people'">
              <co-author-button :co-authors="props.article.coAuthors" :button-icon="slotProps.icon"/>
            </article-item-button>

          </div>

          <div class="desktop-hide q-mx-auto q-my-none">
            <q-item-label >Year: <span class="text-bold inline">2021</span></q-item-label>
            <q-item-label >Cited: <span class="text-bold inline">364</span></q-item-label>
          </div>
        </q-item-section>
  </q-item>

  <q-separator spaced inset />

</template>

<script setup charset="utf-8" lang="ts">

import ArticleItemButton from '../../sharedcomponents/buttons/articlebuttons/ArticleItemButton.vue';
import { Article } from 'schala-core';
import CiteButton from 'src/sharedcomponents/buttons/articlebuttons/CiteButton.vue';
import ShareButton from 'src/sharedcomponents/buttons/articlebuttons/ShareButton.vue';
import CoAuthorButton from 'src/sharedcomponents/buttons/articlebuttons/CoAuthorButton.vue';

const props = defineProps<{
  article: Article,
}>()

const goToArticle = (): void => {
    return; //TODO: Implement me
};
goToArticle();

</script>