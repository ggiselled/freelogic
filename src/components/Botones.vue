<!-- 
  -Muestra los botones de estado (borradores, confirmadas, visadas).
  -Funcionalidad que permite cambiar el estado activo de la aplicación.
  -Cada botón muestra un icono y un nombre correspondiente al estado.
 -->
<template>
  <div class="botones-container">
    <button v-for="(nombreMostrado, estado) in estadoMap" :key="estado" class="botones"
      :class="['btn', estadoActivo === estado ? 'btn-select' : 'btn-light']" @click="setEstadoActivo(estado)">
      <i :class="iconos[estado]" aria-hidden="true" ></i> {{ nombreMostrado }}
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

<style scoped>
.botones-container{
  display: flex;
}

.botones{
  width: 140px;
  padding: 1.5rem;
  margin: 0.2rem;
}
.btn-select{
  background-color: #002846;
  color: #ffff;
}

.bi-check-all::before{
  width: 34px;
}

@media(max-width: 480px){
  .botones{
    width: 110px;
    padding: 0.5rem;
  }

  .bi-check-all::before{
  width: 40px;
}
}

</style>