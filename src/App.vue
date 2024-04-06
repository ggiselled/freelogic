<!-- 
  -Muestra a lista de fichas filtradas según el estado seleccionado.
  -Lógica para cargar las fichas, filtrarlas por estado y funcionalidad de pago.
 -->

<template>
  <div class="app">
    <div class="app-container">
      <h1>EJERCICIO</h1>
      <Botones />
      <div class="cargando" v-if="isLoading">Cargando...</div>
      <div v-else>
        <div v-if="fichasFiltradas.length === 0">No hay fichas para mostrar</div>
        <Ficha v-for="ficha in fichasFiltradas" :key="ficha.id" :ficha="ficha" @pagar="pagarFicha" />
      </div>
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

<style scoped>
.app{
  background-color: #F0F5FF;
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
}

.app-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.cargando{
  font-size: 1rem;
  font-weight: 800;
}

</style>
