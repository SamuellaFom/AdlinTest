<template>
  <div>
    <div>
      <label for="start_date">Date de réservation :</label>
      <input type="datetime-local" v-model="state.start_date" id="start_date">
    </div>
    <div>
      <label for="end_date">Fin de réservation :</label>
      <input type="datetime-local" v-model="state.end_date" id="end_date">
    </div>
    <button type="submit" @click="submitForm">Confirmer</button>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: {
    room_name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();

    const state = reactive({
      start_date: '',
      end_date: '',
    });

    const rules = computed(() => {
      return {
        start_date: { required },
        end_date: { required },
      };
    });

    const v$ = useValidate(rules, state);

    const submitForm = async (e) => {
      e.preventDefault()
      v$.value.$validate()
      if (!v$.value.$error) {
        fetch(`${import.meta.env.VITE_API_URL}api/create/reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": props.room_name,
            "start_date": state.start_date,
            "end_date": state.end_date,
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          })
          .catch(error => console.error('Fetch error:', error));
        router.push('/');
        //alert('Form succesfully submitted')
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