<template>
  <div class="modal-box">
    <div class="modal">
      <div class="payment-state" :class="{success: isPaymentMatch, fail: !isPaymentMatch}">
        {{isPaymentMatch ? 'Success!' : 'Fail!'}}
      </div>
      <p>Maximum offer was: <strong>{{employer}}</strong></p>
      <p>Minimum offer was: <strong>{{employee}}</strong></p>

      <div class="weather">
        <p v-if="loadingWeather">Loading weather for {{cityToLoadWeatherFor}}</p>
        <div v-else>
          <p>Weather in {{cityToLoadWeatherFor}} is:</p>
          <strong>{{weatherData.desc}}</strong>
          <strong>{{weatherData.temp}}</strong>
          <button @click="loadWeatherForCity(cityToLoadWeatherFor)">refresh weather data</button>
        </div>
      </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

const openWeatherKEY = 'de4fed4b3bfffc8d084df26ad8fe2e06'

export default {
  props: {
    employer: Number,
    employee: Number,
  },
  emits: ['close'],
  setup (props, { emit }) {
    const isPaymentMatch = computed(() => props.employee <= props.employer)

    const closeModal = function () {
      emit('close')
    }

    const loadingWeather = ref(true)
    const cityToLoadWeatherFor = 'Prague' // This sits here just to make the loading function accept parameters for later refactoring.
    let weatherData = reactive({
      temp: '-',
      desc: '-'
    })
    const loadWeatherForCity = async function (city) {
      loadingWeather.value = true

      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherKEY}`)

      if (response.ok) {
        const data = await response.json()
        weatherData.desc = data.weather.map(i => i.description).join(', ')
        weatherData.temp = `${data.main.temp} C`
      } else {
        alert('Loading weather failed')
      }
      loadingWeather.value = false
    }

    loadWeatherForCity(cityToLoadWeatherFor)

    return {
      loadWeatherForCity,
      cityToLoadWeatherFor,
      weatherData,
      isPaymentMatch,
      loadingWeather,
      closeModal
    }
  }
}
</script>

<style scoped lang="scss">
  .modal-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;

    .modal {
      background-color: #ffffff;
      margin: auto;
      padding: 20px;

      p {
        margin: 0;
      }
      .payment-state {
        padding: 20px;
        font-weight: 700;

        &.success {
          color: greenyellow;
        }
        &.fail {
          color: orangered;
        }
      }
      .weather {
        margin: 20px 5px;
        font-style: italic;

        >div {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>
