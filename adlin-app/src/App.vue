<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import HelloWorld from './pages/HelloWorld.vue';

</script>
<template>
  <header>
    <HeaderComponent />
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>
