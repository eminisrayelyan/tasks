<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Home from './components/Home.vue';


</script>

<template>
  <Header></Header>
  <main>
    <RouterView></RouterView>
  </main>
  <Footer></Footer>
</template>

<style scoped>

</style>
