<!-- 
Template:
-Muestra el estado de "timbrado" y "cep". Si ficha.timbrado/cep es true, muestra un ícono de check. Si es false, muestra un botón de pagar que llama a la función emitirPagar.

Script:
-Utiliza defineProps que recibe "ficha", la cual contiene los detalles de la ficha, incluyendo si timbrado y cep están pagados.
-Con useStore se accede al store para realizar la acción de emitirPagar que despacha la acción pagarFicha al store con un payload que incluye el id de la ficha y el tipo de pago (timbrado o cep). Además imprime un mensaje en consola para confirmar que se pagó.
 -->

<template>
    <div  class="d-flex flex-row justify-content-center align-items-end w-80" >
      <div class="data">
        TIMBRADO:
        <i class="bi bi-check-circle-fill" style="color: var(--bs-success);" v-if="ficha.timbrado" ></i>
        <button v-else class="btn btn-primary btn-sm" @click="emitirPagar('TIMBRADO')">PAGAR</button>
      </div>
      <div class="data">
        CEP:
        <i class="bi bi-check-circle-fill" style="color: var(--bs-success);" v-if="ficha.cep" ></i>
        <button v-else class="btn btn-primary btn-sm" @click="emitirPagar('CEP')">PAGAR</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  
  const props = defineProps({
    ficha: Object,
  });
  
  function emitirPagar(tipo) {
    store.dispatch('pagarFicha', { id: props.ficha.id, tipo });
    console.log(`${tipo} PAGADO`);
  }
  </script>
  
<style scoped>
.data{
  padding: 15px;
  height: 40px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

button{
  font-size: 0.6rem;
}
</style>
  