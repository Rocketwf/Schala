<template>
    <q-chip square dense size="lg">
        <q-item-label>{{ props.expertise }}</q-item-label>
    </q-chip>
</template>

<script setup charset="utf-8" lang="ts">
const props = defineProps<{
    expertise: string;
}>();
</script>