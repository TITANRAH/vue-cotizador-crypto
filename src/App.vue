<script setup>
import { ref } from 'vue';
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import Cotizacion from './components/Cotizacion.vue'
import useCripto from './composables/useCripto';

// llamamos al composable, es como un hook de react
const {cotizacion, mostrarCotizacion, cotizar, monedas, criptoMonedas, cargando, obtenerCotizacion } = useCripto();
// defino el error de la alera que a su vez tiene un slot para poner elementos dentro
const error = ref('')
// objeto reactivo que necesita los datos de moneda y criptomoneda


const cotizarCripto = () => {
  if (Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son obligatorios'
    return
  }
  error.value = ''
  obtenerCotizacion()
}



</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">
      Cotizador de <span>CriptoMonedas</span>
    </h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form @submit.prevent="cotizarCripto" class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:
          </label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">--Selecciona--</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">CriptoMoneda:
          </label>
          <select id="cripto" v-model="cotizar.criptomoneda">
            <option value="">--Selecciona--</option>
            <option v-for="criptomoneda in criptoMonedas" :value="criptomoneda.CoinInfo.Name">{{
              criptomoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
      <input type="submit" value="Cotizar">
      </form>
      <Spinner v-if="cargando" />
       <Cotizacion v-if="mostrarCotizacion" :cotizacion="cotizacion" />
    </div>
  </div>
</template>

