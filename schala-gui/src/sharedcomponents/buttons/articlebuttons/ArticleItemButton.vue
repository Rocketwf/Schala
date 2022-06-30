<template>
        <slot :icon="props.icon" />
</template>

<script setup charset="utf-8" lang="ts">

const props = defineProps<{
    icon: string,
}>()

</script>