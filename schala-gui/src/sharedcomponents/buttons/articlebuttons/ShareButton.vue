<template>
    <q-btn size="12px" flat dense round :icon="buttonIcon" @click="share" />
</template>

<script setup charset="utf-8" lang="ts">

const props = defineProps<{
    url: string,
    buttonIcon: string;
}>()

const share = (): void => {
    return; //TODO: Implement me
};

</script>