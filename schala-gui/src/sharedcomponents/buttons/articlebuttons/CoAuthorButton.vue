<template>
  <q-btn-dropdown
    size="12px"
    flat
    dense
    round
    :icon="buttonIcon"
  >
    <q-list>
      <q-item
        v-for="coAuth in coAuthors"
        :key="coAuth.id"
        clickable
        v-close-popup
        @click="changeProfile(coAuth.id)"
      >
        <q-item-section>
          <q-item-label>{{ coAuth.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup charset="utf-8" lang="ts">
import { ArticleCoAuthor } from 'schala-core';
import { profilePageStore } from '../../../stores/profilePageStore';


defineProps<{
    coAuthors: ArticleCoAuthor[];
    buttonIcon: string;
}>();

const changeProfile = (value: string): void => 
{
    profilePageStore().setProfileId(value);
};
</script>