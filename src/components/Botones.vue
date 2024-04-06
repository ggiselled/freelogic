<template>
  <div class="botones">
    <button v-for="(nombreMostrado, estado) in estadoMap" :key="estado"
      :class="['btn', estadoActivo === estado ? 'btn-primary' : 'btn-secondary']" @click="setEstadoActivo(estado)">
      <i :class="iconos[estado]" aria-hidden="true"></i> {{ nombreMostrado }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const estadoActivo = computed(() => store.state.estadoActivo);

const setEstadoActivo = (estado) => {
  store.commit('setEstadoActivo', estado);
};

const estadoMap = {
  'BORRADOR': 'Borradores',
  'CONFIRMADA': 'Confirmadas',
  'VISADA': 'Visadas'
};

const iconos = {
  'BORRADOR': 'bi bi-arrow-repeat',
  'CONFIRMADA': 'bi bi-check-circle',
  'VISADA': 'bi bi-check-all'
};
</script>
