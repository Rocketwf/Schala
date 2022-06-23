<template>
 <router-view></router-view>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import SearchResultsPage from '../searchresultspage/SearchResultsPage.vue';
  import { useRouter } from 'vue-router'
  let searchString : string
  const router = useRouter();
  let handleSearch = async (_) => {
    router.push({ path: '/profile/search' });
  };
</script>
