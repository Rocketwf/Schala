<template>
    <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
            <q-toolbar-title>
                <q-avatar>
                   <header-logo />
                </q-avatar>
                schala
            </q-toolbar-title>
            <q-form @submit="call">
                <q-input dark dense standout v-model="text" input-class="text-left" class="float-right q-mb-sm q-mt-sm">
                    <template #append>
                        <q-icon v-if="text === ''" name="search" />
                        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                    </template> 
                </q-input>
            </q-form>
        </q-toolbar>
        <nav-bar></nav-bar>
    </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderLogo from './HeaderLogo.vue';
import NavBar from './NavBar.vue';
import { searchResultsStore } from '../../stores/searchResultsPageStore';
import { useRouter, Router } from 'vue-router';
const router: Router = useRouter();

const searchStore = searchResultsStore();
const text = ref('');
text;
const call = () => {
    searchStore.setSearchString(text.value);
    router.push({ path: '/profile/search' });
}
</script>
