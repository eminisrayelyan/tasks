<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';


</script>

<template>
  <Header v-once></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer v-once></Footer>
</template>

<style scoped>

</style>
