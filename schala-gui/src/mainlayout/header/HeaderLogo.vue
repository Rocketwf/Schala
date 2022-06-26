<template>
    <div id="headerLogo">
        <q-form @submit="redirectHome"></q-form>
        <img src="../../assets/wisteria_Background_only_plant.png" />
    </div> 
</template>
<script setup lang="ts">
    import { useRouter, Router } from 'vue-router';
     const router: Router = useRouter();
     const redirectHome = () => {
       router.replace("#")
};
</script>