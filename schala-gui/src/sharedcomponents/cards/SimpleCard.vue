<template>
    <q-card class="my-card" style="height: 100%">
        <q-card-section>
            <div class="text-h6 q-mb-xs">{{ title }}</div>
            <q-item-label caption>{{ sub }}</q-item-label>
        </q-card-section>

        <q-card-section>
            <slot />
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts" charset="utf-8">
/*import { inject } from 'vue'*/
import { Input } from 'components/quasar/Input';
import CardButton from 'components/quasar/CardButton.vue';

defineProps<{
    title: string;
    sub?: string;
    buttons: Array<{
        buttonId: string;
        inputs: Array<Input>;
        label: string;
        badge: boolean;
    }>;
}>();

/*const injectedUpdateContent = inject<(_?: number) => void>('updateContentSymbol')*/
/*const updateContent = (data?:number) => { if(injectedUpdateContent) injectedUpdateContent(data) }*/
</script>
