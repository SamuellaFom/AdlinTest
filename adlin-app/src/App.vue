<script setup>
import HeaderComponent from './components/HeaderComponent.vue';

</script>
<template>
  <header>
    <HeaderComponent />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>