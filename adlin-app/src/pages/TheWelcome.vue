<script>
export default {
  props: {
    RoomsAvailable: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log(this.RoomsAvailable);
  }
}
</script>


<template>
  <div class="firstContaniner">
    <div class="secondContainer">
      <div class="image-list">
        <div class="card">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample23.jpg" alt="Image 1">
          <div class="card-info" v-for="room in RoomsAvailable" :key="room.name">
            <h2>{{ room.name }}</h2>
            <p>{{ room.capacity }}</p>
            <p v-for="equipment in room.equipments" :key="equipment">{{ equipment.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
.firstContaniner {
  background-color: white;
  padding: 80px;
  display: table;
  height: 100%;
  margin: 0 auto;
}

.secondContainer {
  display: table-cell;
  vertical-align: middle;
}
</style>
