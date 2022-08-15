<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="my-card"
      style="max-width: 1000px"
    >
      <!--
        ...content
        ... use q-card-section for it?
      -->
      <q-card-section>
        <div class="text-h5">
          {{ article.title }}
          <cite-button
            :bibtex="article.bibtex"
            button-icon="people"
            :text="true"
          />
        </div>
      </q-card-section>
      <q-card-section v-if="article.abstract">
        <div class="text-weight-bold">
          Abstract:
        </div>
        <div class="text-body2">
          {{ article.abstract }}
        </div>
      </q-card-section>
      <q-card-section v-if="article.venue">
        <div><span class="text-weight-bold">Published in:</span> {{ article.venue }}.</div>
      </q-card-section>
      <q-card-section v-if="article.citationCount !== 0">
        <div>
          <span class="text-weight-bold">Cited by:</span> {{ article.citationCount }} paper{{
            article.citationCount > 1 ? 's' : ''
          }}.
        </div>
      </q-card-section>
      <q-card-section v-if="article.fieldsOfExpertise.length">
        <div>
          <span class="text-weight-bold">Fields of study:</span>
          {{ article.fieldsOfExpertise.reduce((curr, next) => curr + ', ' + next) }}.
        </div>
      </q-card-section>
      <q-card-section v-if="article.publicationDate">
        <div>
          <span class="text-weight-bold">Publication date:</span>
          {{
            new Date(article.publicationDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}.
        </div>
      </q-card-section>
      <q-card-section v-if="article.selfCitationsCount">
        <div>
          <span class="text-weight-bold">This author cited in this paper {{ article.selfCitationsCount }} of their other paper{{
            article.selfCitationsCount > 1 ? 's' : ''
          }}.</span>
        </div>
      </q-card-section>
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn
          color="red"
          label="close"
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { Article } from 'schala-core';
import CiteButton from '../../sharedcomponents/buttons/articlebuttons/CiteButton.vue';

defineProps<{
    article: Article;
}>();

defineEmits([
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
</script>
