<template>
    <q-btn-dropdown size="12px" flat dense round :icon="buttonIcon">
        <q-list>
            <q-item clickable v-close-popup @click="changeProfile">
                <q-item-section>
                    <q-item-label>Tobias Hey</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-btn-dropdown>
</template>

<script setup charset="utf-8" lang="ts">
import { CoAuthor } from 'schala-core/dist/models/articles/Article';

const props = defineProps<{
    coAuthors: CoAuthor[];
    buttonIcon: string;
}>()

const changeProfile = (): void => {
    return;
}

</script>