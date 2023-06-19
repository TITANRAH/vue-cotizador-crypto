<script setup>

// no me servira el composable por que ya se esta usando una instancia en app.vue
// import useCripto from '../composables/useCripto';

// const {cotizacion} = useCripto();

// console.log(cotizacion)

// puede ser asi pero tamnien como const props = defineProps()
defineProps({
    cotizacion: Object,
    required: true
})

</script>
<template>
    <div  class="contenedor-resultado">
        <h2>Cotización</h2>
        <div class="resultado">
            <img :src="'https://cryptocompare.com/' + cotizacion.IMAGEURL" class="" alt="imagen-cript">
            <div>
                <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
                <p>El precio más alto del dia: <span>{{ cotizacion.HIGHDAY }}</span></p>
                <p>El precio más bajo del dia <span>{{ cotizacion.LOWDAY }}</span></p>
                <p>Validación Últimas 24 hrs: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
                <p>Última actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
        </div>
    </div>
</template>

