<template>
  <q-dialog v-model="show">
    <q-card
      class="my-card"
      style="max-width: 1000vw"
    >
      <q-card-section>
        <div class="text-h6">
          BibTex
        </div>
      </q-card-section>

      <q-card-section class="q-px-lg">
        <pre>{{ props.bibtex }}</pre>

        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            label="Copy"
            @click="copy"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-btn
    size="12px"
    flat
    dense
    round
    @click="show = true"
    :icon="buttonIcon"
  />
</template>

<script setup charset="utf-8" lang="ts">
import { useQuasar, copyToClipboard } from 'quasar';
import { ref } from 'vue';

let show = ref(false);
const $q = useQuasar();

const props = defineProps<{
    bibtex: string;
    buttonIcon: string;
}>();

const copy = (): void => 
{
    copyToClipboard(props.bibtex)
        .then(() => 
        {
            triggerPositive();
        })
        .catch(() => 
        {
            triggerNegative();
        });
};

const triggerPositive = () => 
{
    $q.notify({
        type: 'positive',
        message: 'Copied to clipboard',
    });
};

const triggerNegative = () => 
{
    $q.notify({
        type: 'negative',
        message: 'Failed to copy',
    });
};
</script>
