<template>
  <simple-card :simple-card-model="props.cardModel">
    <template #buttons />
    <template #model>
      <q-tabs
        v-model="exp_tab"
        class="text-teal"
      >
        <q-tab
          v-for="exp in props.cardModel.expertise"
          :key="exp.id"
          :label="exp.name"
          :name="exp.id"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="exp_tab"
        animated
        swipeable
      >
        <q-tab-panel
          v-for="author in props.cardModel.expertise"
          :key="author.id"
          :name="author.id"
        >
          <q-card-section>
            <expertise-item
              v-for="exp in author.expertise"
              :key="exp.name"
              :expertise="exp.name"
              :count="exp.count"
            />
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </simple-card>
</template>

<script setup charset="utf-8" lang="ts">
import ExpertiseItem from './ExpertiseItem.vue';
import { ExpertiseModel } from 'schala-core';
import SimpleCard from './SimpleCard.vue';
import {ref} from 'vue';

const props = defineProps<{
    cardModel: ExpertiseModel;
}>();

const exp_tab = ref(props.cardModel.expertise[0].id);
</script>
