<template>
  <div class="greetings">
    <form @submit.prevent="submitForm">
      <label>FILTRES</label>
      <p>
        Début de réservation?
        <input type="datetime-local" v-model="state.start_date">
      </p>
      <p>
        Fin de réservation?
        <input type="datetime-local" v-model="state.end_date">
      </p>

      <label>Capacité:</label>
      <select name="capacity" required id="capacity-select" v-model="state.capacity">
        <option value="">Please choose an option</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="26">26</option>
      </select>

      <label>Equipements:</label>
      <div class="check">
        <input type="checkbox" id="tv" name="tv" checked v-model="state.equipements" />
        <label for="tv">TV</label>
      </div>
      <div class="check">
        <input type="checkbox" id="Retro" name="Retro" checked v-model="state.equipements" />
        <label for="Retro">Retro Projecteur</label>
      </div>
      <button type="submit">Add item</button>
    </form>
  </div>
</template>

<script>
import { useValidate, required } from '@vuelidate/core'
import { reactive, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      start_date: '',
      end_date: '',
      capacity: '',
      equipements: []
    })

    const rules = computed(() => {
      return {
        start_date: { required },
        end_date: { required },
        capacity: { required },
        equipements: { required },
      }
    })

    const v$ = useValidate(rules, state)

    const submitForm = () => {
      v$.$validate()
      if (!v$.$error) {
        console.log(state)
        alert('Form successfully submitted')
      } else {
        alert('Form failed validation')
      }
    }

    return {
      state,
      submitForm
    }
  }
}
</script>

<style scoped>
.check {
  margin: 8px 0;
}

input[type=datetime-local],
select {
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

form {
  background-color: #D9D9D9;
  width: 40%;
  max-width: 270px;
  padding: 20px;
  height: auto;
  margin: 2%;
  color: black;
}

button {
  background-color: #0D0032;
  color: white;
  width: 100%;
  padding: 12px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

@media only screen and (max-width: 600px) {
  form {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
