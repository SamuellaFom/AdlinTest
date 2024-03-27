<template>
  <div class="firstContaniner">
    <div class="secondContainer">
      <div v-for="room in roomsAvailable" :key="room" class="card">
        <img :src="room.image" alt="photo">
        <div class="card-info">
          <h2>{{ room.name }}</h2>
          <p>Capacity: {{ room.capacity }}</p>
          <p v-if="room.equipements.length > 0">Equipments:</p>
          <ul v-if="room.equipements.length > 0">
            <li v-for="equipement in room.equipements" :key="equipement.id">{{ equipement.name }}</li>
          </ul>
          <p v-else>Aucun équipements disponibles</p>
          <button @click="(() => { showModal = !showModal })">Reserver</button>
          <Model v-if="showModal" :roomName="room.name"></Model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import Model from '../components/Model.vue';

export default {
  data() {
    return {
      roomsAvailable: '',
      showModal: false,
    }
  },
  setup() {
    const router = useRouter();
    const roomsAvailable = JSON.parse(router.currentRoute.value.query.roomsAvailable)

    return {
      roomsAvailable,
    }
  },
  components: {
    Model
  }
}
</script>

<style>
.card {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-info {
  padding: 20px;
}

.card-info h2 {
  margin-top: 0;
  font-size: 20px;
  color: #333;
}

.card-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

.card-info p:last-child {
  margin-bottom: 0;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}
</style>
