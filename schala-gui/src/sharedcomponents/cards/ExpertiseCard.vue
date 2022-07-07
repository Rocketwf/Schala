<template>
    <simple-card :simple-card-model="props.cardModel">
        <q-card-section>
            <expertise-item
                v-for="exp in props.cardModel.expertise[0].expertise"
                :key="exp"
                :expertise="exp"
            />
        </q-card-section>
    </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import ExpertiseItem from './ExpertiseItem.vue';
import { ExpertiseModel } from 'schala-core';
import SimpleCard from './SimpleCard.vue';
import { ref } from 'vue';

const props = defineProps<{
    cardModel: ExpertiseModel;
}>();
let tab = ref(props.cardModel.expertise[0]);
</script>
