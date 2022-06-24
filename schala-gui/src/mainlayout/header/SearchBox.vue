<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { useRouter, Router } from 'vue-router';
let searchString: string;
const router: Router = useRouter();
const handleSearch = () => {
    searchString;
    router.push({ path: '/profile/search' });
};
handleSearch;
</script>
