<template>
    <div>
      <div>
        TIMBRADO:
        <span v-if="ficha.timbrado" class="badge bg-success">✔</span>
        <button v-else class="btn btn-primary" @click="emitirPagar('TIMBRADO')">Pagar Timbrado</button>
      </div>
      <div>
        CEP:
        <span v-if="ficha.cep" class="badge bg-success">✔</span>
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
  
  