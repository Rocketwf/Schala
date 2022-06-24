<template>
  <div id="mainPageContainer">
    
    <div id="logoSearch">
      <img src="../../assets/logo.png" />
    </div>
    <search-component />
</div>
</template>
<script setup lang="ts">
import SearchComponent from './SearchComponent.vue'
import { SemanticScholarSource } from 'schala-core'

SemanticScholarSource.getInstance().fetchHIndex('1679754').then(data => {console.log(data)})


</script>
<style type="text/css" media="screen" scoped>
#mainPageContainer {
  width: 1200px;
  margin: 0 auto;
  margin-top: 10%;
}
#logoSearch {
  margin: 0 auto;
  text-align: center;
}
#logoSearch img {
  height: 220px;
  width: 400px;
}
</style>

