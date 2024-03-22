<template>
  <div class="firstContaniner">
    <div class="secondContainer">
      <form>
        <div class="form-inline">
          <div class="form-group">
            <label for="start_date">Date de réservation :</label>
            <input type="datetime-local" required v-model="state.start_date" id="start_date">
          </div>
          <div class="form-group">
            <label for="end_date">Fin de réservation :</label>
            <input type="datetime-local" required v-model="state.end_date" id="end_date">
          </div>
          <div class="form-group">
            <label for="capacity-select">Capacité :</label>
            <select name="capacity" required id="capacity-select" v-model="state.capacity">
              <option value="">Please choose an option</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="26">26</option>
            </select>
          </div>
          <div class="form-group">
            <label>Equipements :</label>
            <div class="check">
              <input type="checkbox" id="tv" name="tv" @change="(() => { state.equipements.push('TV') })" />
              <label for="tv">TV</label>
            </div>
            <div class="check">
              <input type="checkbox" id="Retro" name="Retro"
                @change="(() => { state.equipements.push('Retro Projecteur') })" />
              <label for="Retro">Retro Projecteur</label>
            </div>
          </div>
        </div>
        <button type="submit" @click="submitForm">Rechercher</button>
      </form>
    </div>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter();

    const state = reactive({
      start_date: '',
      end_date: '',
      capacity: '',
      equipements: []
    });

    const rules = computed(() => {
      return {
        start_date: { required },
        end_date: { required },
        capacity: { required },
        equipements: {},
      };
    });

    const v$ = useValidate(rules, state);

    const submitForm = async (e) => {
      e.preventDefault()
      v$.value.$validate()
      if (!v$.value.$error) {
        fetch(`${import.meta.env.VITE_API_URL}api/room_available`, {
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
            } else {
              return response.json();
            }
          })
          .then(data => {
            if (data == "No room available") {
              alert('Aucune salle disponible')
            } else {
              router.push({
                name: 'roomAvailable',
                query: {
                  roomsAvailable: JSON.stringify(data)
                }
              });
            }
          })
          .catch(error => console.error('Fetch error:', error));
      } else {
        alert('Form failed validation')
      }
    }

    return {
      state,
      v$,
      submitForm,
    };
  }
}
</script>

<style>
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

form {
  background-color: white;
  padding: 70px;
  border-radius: 8px;
}

.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

input[type=datetime-local],
select {
  vertical-align: middle;
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  line-height: 20px;
}

@media screen and (max-width: 640px) {

  input[type=datetime-local],
  select {
    margin: 5px 0;
  }

  form {
    padding: 20px;
  }

  .firstContaniner {
    width: 10%;
  }

  .form-inline {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>