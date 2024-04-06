<!-- 
-Muestra el estado de las fichas confirmadas (estado de timbrado y cep).
-Funcionalidad de pago de timbrado o CEP si todavía no están pagos.
 -->

<template>
    <div>
      <div>
        TIMBRADO:
        <i class="bi bi-check-circle-fill" style="color: var(--bs-success);" v-if="ficha.timbrado" ></i>
        <button v-else class="btn btn-primary btn-sm" @click="emitirPagar('TIMBRADO')">PAGAR</button>
      </div>
      <div>
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
  
  