<template>

    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
      v-model="search"
      debounce="500"
      filled
      placeholder="Search for a name or an ID"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-form>

    </div>
    <div>
      <q-btn id="butn" label="Search" class="float-right" type="submit" color="primary"/>
    </div>
</template>
<script setup lang="ts">

import { ref } from 'vue' 
import { useRouter } from 'vue-router' 
import { FullProfile } from '@core/test.ts'

new FullProfile()



const router = useRouter()

let model = ref('')

let onSubmit = async () => {
  router.push({ path: '/profile/search'})
}

</script>
<style type="text/css" media="screen" scoped>
#butn {
  margin-top: 10px;
}
</style>

