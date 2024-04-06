<template>
  <div class="botones">
    <button v-for="(nombreMostrado, estado) in estadoMap" :key="estado"
      :class="['btn', estadoActivo === estado ? 'btn-primary' : 'btn-secondary']" @click="setEstadoActivo(estado)">
      {{ nombreMostrado }}
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
  'BORRADOR': 'Borrador',
  'CONFIRMADA': 'Confirmadas',
  'VISADA': 'Visadas'
};
</script>
