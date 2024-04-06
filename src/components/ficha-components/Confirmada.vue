<template>
    <div>
      <div>
        TIMBRADO:
        <i class="bi bi-check-circle-fill" style="color: var(--bs-success);" v-if="ficha.timbrado" ></i>
        <button v-else class="btn btn-primary" @click="emitirPagar('TIMBRADO')">Pagar Timbrado</button>
      </div>
      <div>
        CEP:
        <i class="bi bi-check-circle-fill" style="color: var(--bs-success);" v-if="ficha.cep" ></i>
        <button v-else class="btn btn-primary" @click="emitirPagar('CEP')">Pagar CEP</button>
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
  
  