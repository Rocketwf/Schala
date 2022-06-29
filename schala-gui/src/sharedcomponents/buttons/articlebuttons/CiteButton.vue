<template>
    <q-dialog v-model="show">
        <q-card class="my-card">
              
            <q-card-section>
                <div class="text-h6">BibTex</div>
            </q-card-section>

            <q-card-section class="q-px-lg">
                {{ props.bibtex }}

                <q-card-actions align="right">
                    <q-btn flat color="primary" label="Copy" @click="copy" />
                </q-card-actions>

            </q-card-section>

        </q-card>
    </q-dialog>

    <q-btn size="12px" flat dense round @click="show = true" :icon="buttonIcon" />

</template>

<script setup charset="utf-8" lang="ts">
import { ref } from 'vue'

let show = ref(false);

const props = defineProps<{
    bibtex: string,
    buttonIcon: string
}>()

const copy = (): void => {
    return; //TODO: Implement me
};

</script>