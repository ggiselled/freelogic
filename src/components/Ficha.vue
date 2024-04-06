<!-- 
-Muestra los detalles de cada ficha (nombre, dirección, hash y fecha).
-Contiene componente dinámico que cambia según el estado de la ficha (borrador, confirmada o visada).
-Funcionalidad de pago de timbrado o cep según el estado de la ficha.
 -->

<template>
  <div class="card ficha mb-3">
    <div class="card-body">
      <div v-for="(nameInfo, index) in ficha.names" :key="index">
        <h4 class="card-text">
          {{ nameInfo.name }}
        </h4>
      </div>
      <div class="d-flex flex-row justify-content-between">
        <span class="card-id rounded">#{{ ficha.id }}</span>
        <span class="card-date">{{ ficha.date }}</span>
      </div>
      <p class="card-text">{{ ficha.address }}</p>
    </div>
    <div class="card-footer">
      <component :is="componenteEstado" :ficha="ficha" @pagar="emitirPagar" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, getCurrentInstance } from 'vue';
import Borrador from './ficha-components/Borrador.vue';
import Confirmada from './ficha-components/Confirmada.vue';
import Visada from './ficha-components/Visada.vue';

const props = defineProps({
  ficha: Object,
});

const componenteEstado = computed(() => {
  switch (props.ficha.state.name) {
    case 'BORRADOR':
      return Borrador;
    case 'CONFIRMADA':
      return Confirmada;
    case 'VISADA':
      return Visada;
    default:
      return Borrador;
  }
});

const { emit } = getCurrentInstance();


function emitirPagar(payload) {
  emit('pagar', payload);
  console.log(`${payload.tipo} PAGADO`);
}
</script>

<style scoped>
.card{
  margin-top: 1rem;
  width: 90vw;

}

.card-id{
  background-color:#82C3F0;
  padding: 7px 8px;
  color: #ffff;

}

.card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-around
}

.card-date{
  margin-right: 2.5%;
  padding: 7px 8px;
}


.ficha {
  max-width: 440px;
  height: 240px;
}

.card-footer{
  background-color: transparent;
}


</style>
