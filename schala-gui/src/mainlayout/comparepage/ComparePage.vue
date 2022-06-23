<template>
  <div class="row justify-center" style="width: 100%">
    <div class="col-md-3 col-sm-12 self-center">
      <profile-basic
        name="Walter F. Tichy"
        size="3"
        scholar_id="23RPQBQAAAAJ"
        affiliation="KIT"
        button_class="negative"
        profile_pic="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=23RPQBQAAAAJ&citpid=2"
        button_type="Delete"
      />
    </div>
    <div class="col-md-3 col-sm-12 self-center">
      <profile-basic
        name="Gregor Snelting"
        size="3"
        scholar_id="sprhcYcAAAAJ"
        affiliation="KIT"
        button_class="negative"
        profile_pic="https://scholar.google.com/citations/images/avatar_scholar_128.png"
        button_type="Delete"
      />
    </div>
    <div class="col-md-3 col-sm-12 self-center">
      <profile-basic
        name="Klemens Böhm"
        size="3"
        scholar_id="RzCtTjYAAAAJ"
        affiliation="KIT"
        button_class="negative"
        profile_pic="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=RzCtTjYAAAAJ&citpid=2"
        button_type="Delete"
      />
    </div>
    <div class="col-md-3 col-sm-12 self-center">
      <profile-basic
        name="Mehdi B. Tahoori"
        size="3"
        scholar_id="NBQ_casAAAAJ"
        affiliation="KIT"
        button_class="negative"
        profile_pic="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=NBQ_casAAAAJ&citpid=2"
        button_type="Delete"
      />
    </div>
  </div>
</template>
<script lang = "ts">

import { ref, defineComponent } from 'vue'
import {} from '../../sharedcomponents/ProfileSummary.vue'
import { profilePageStore } from '../../stores/profilePageStore'

</script>
