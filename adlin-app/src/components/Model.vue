<template>
  <div>
    <div>
      <label for="startDate">Date de réservation :</label>
      <input type="datetime-local" v-model="state.startDate" id="startDate">
    </div>
    <div>
      <label for="endDate">Fin de réservation :</label>
      <input type="datetime-local" v-model="state.endDate" id="endDate">
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
    roomName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();

    const state = reactive({
      startDate: '',
      endDate: '',
    });

    const rules = computed(() => {
      return {
        startDate: { required },
        endDate: { required },
      };
    });

    const v$ = useValidate(rules, state);

    const submitForm = async (e) => {
      e.preventDefault()
      v$.value.$validate()
      
      if (!v$.value.$error) {
        fetch(`${import.meta.env.VITE_API_URL}/api/create/reservation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "name": props.roomName,
            "startDate": state.startDate,
            "endDate": state.endDate,
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
          })
          .catch(error => console.error('Fetch error:', error));
        router.push('/');
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