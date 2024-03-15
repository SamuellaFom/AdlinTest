<script setup>
import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Adlin logo" class="logo" src="./assets/adlin1.png" height="125" />
  </header>

  <main>
    <div>
      <h1 class="centered">Reservation de salle</h1>
      <HelloWorld/>
    </div> 
  </main>
</template>

<style>

.centered {
  text-align: center; /* Centrer le texte horizontalement */
  color: white
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} 

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
