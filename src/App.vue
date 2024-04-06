<!-- 
Template:
-La comprobación v-if muestra un mensaje de carga si la propiedad "isLoading" es true. Si los datos por alguna razón no cargaran, se muestra el mensaje correspondiente.
-Si hay datos disponibles, se itera sobre el array de datos, creando un componente Ficha por cada ficha de datos disponible.
-Se escucha el evento "pagar" en las fichas correspondientes a "Confirmadas".

Script:
-Se crea una instancia de Vuex llamada store. Con useStore, se obtiene la instancia actual del store y se asigna a la constante store.
-Las constantes fichas, estadoActivo, isLoading, reaccionan a los cambios que se produzcan en el store.
-La constante fichasFiltradas reacciona a los cambios en "fichas" y "estadoActivo" y utiliza filter() para obtener las fichas que coinciden con el estado activo (Borradores, Confirmadas, Visadas)
-La función pagarFicha envía la acción al store con un payload que contiene la información de la ficha a pagar.
-Se despacha la acción fetchFichas para cargar las fichas desde el servidor o endpoint configurado en Vuex.
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
