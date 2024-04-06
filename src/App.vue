<template>
  <div>
    <h1>Ejercicio</h1>
    <Botones />
    <div v-if="isLoading">Cargando...</div>
    <div v-else>
      <div v-if="fichasFiltradas.length === 0">No hay fichas para mostrar</div>
      <Ficha v-for="ficha in fichasFiltradas" :key="ficha.id" :ficha="ficha" @pagar="pagarFicha" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Botones from './components/Botones.vue';
import Ficha from './components/Ficha.vue';

const store = useStore();

const fichas = computed(() => store.state.fichas);
const estadoActivo = computed(() => store.state.estadoActivo);
const isLoading = computed(() => store.state.isLoading);

const fichasFiltradas = computed(() => {
  return fichas.value.filter(f => f.state.name === estadoActivo.value);
});

const pagarFicha = (payload) => {
  store.dispatch('pagarFicha', payload);
};

store.dispatch('fetchFichas');
</script>
