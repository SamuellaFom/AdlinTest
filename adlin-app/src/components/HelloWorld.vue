<template>
  <div class="greetings">
    <form>
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
        <input type="checkbox" id="tv" name="tv" @change="(() => { state.equipements.push('TV') })" />
        <label for="tv">TV</label>
      </div>
      <div class="check">
        <input type="checkbox" id="Retro" name="Retro"
          @change="(() => { state.equipements.push('Retro Projecteur') })" />
        <label for="Retro">Retro Projecteur</label>
      </div>
      <button type="submit" @click="submitForm">Add item</button>
    </form>
  </div>
</template>


<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
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
      v$.value.$validate()
      if (!v$.value.$error) {
        fetch('http://194.32.78.202:3000/api/room_available', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "start_date": state.start_date,
            "end_date": state.end_date,
            "capacity": parseInt(state.capacity),
            "equipements": state.equipements
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response.json());
          })
          .catch(error => console.error('Fetch error:', error));

        console.log(state)
        alert('Form succesfully submitted')
      } else {
        alert('Form failed validation')
      }
    }

    return {
      state,
      v$,
      submitForm,
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