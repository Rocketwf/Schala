<template>
    <q-card-section class="flex flex-center justify-center" style="height: 80%;">
        <slot :icon="props.icon" />
    </q-card-section>
</template>

<script setup charset="utf-8" lang="ts">

const props = defineProps<{
    icon: string,
}>()

</script>