<template>
  <div>
    <div>
      <label for="start_date">Date de réservation :</label>
      <input type="datetime-local" id="start_date">
    </div>
    <div>
      <label for="end_date">Fin de réservation :</label>
      <input type="datetime-local" id="end_date">
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModalPreview",
  methods: {}
}
</script>