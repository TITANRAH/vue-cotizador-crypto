import { ref, onMounted, reactive, computed } from "vue";

export default function useCripto() {
  const criptoMonedas = ref([]);
  const monedas = ref([
    { codigo: "USD", texto: "Dolar de Estados Unidos" },
    { codigo: "MXN", texto: "Peso Mexicano" },
    { codigo: "EUR", texto: "Euro" },
    { codigo: "GBP", texto: "Libra Esterlina" },
    { codigo: "CLP", texto: "Peso Chileno" },
  ]);
  const cotizacion = ref({});
  const cargando = ref(false);
  const cotizar = reactive({
    moneda: "",
    criptomoneda: "",
  });

  onMounted(() => {
    const url =
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
    fetch(url)
      .then((resp) => resp.json())
      .then(({ Data }) => (criptoMonedas.value = Data));
    // promise es lo mismo que usar async await
    // podemnos aplicar destructuring
  });

  const obtenerCotizacion = async () => {
    cargando.value = true;
    cotizacion.value = {};
    try {
      const { moneda, criptomoneda } = cotizar;
      const url = ` https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resp = await fetch(url);
      const data = await resp.json();
      // esta forma es mejor para ingresar dentro de los objetos
      console.log(data.DISPLAY[criptomoneda][moneda]);
      cotizacion.value = data.DISPLAY[criptomoneda][moneda];
    } catch (error) {
      console.log(error);
    } finally {
      cargando.value = false;
    }
  };

  // si el objeto cotizacion trae algo la propiedad comnputada sera verdaera
  // por lo que sirve para usarla en el v-if de los campos de cotizacion
  const mostrarCotizacion = computed(() => {
    return Object.values(cotizacion.value).length > 0;
  });
  return {
    monedas,
    criptoMonedas,
    obtenerCotizacion,
    cargando,
    cotizacion,
    cotizar,
    mostrarCotizacion
  };
}
