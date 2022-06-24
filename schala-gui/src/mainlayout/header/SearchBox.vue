<template>
 <router-view></router-view>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  let searchString : string
  const router = useRouter();
  let handleSearch = async (_) => {
    searchString;
    router.push({ path: '/profile/search' });
  };
</script>
