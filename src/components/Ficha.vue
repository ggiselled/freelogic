<!-- 
-Muestra los detalles de cada ficha (nombre, dirección, hash y fecha).
-Contiene componente dinámico que cambia según el estado de la ficha (borrador, confirmada o visada).
-Funcionalidad de pago de timbrado o cep según el estado de la ficha.
 -->

<template>
  <div class="card ficha mb-3">
    <div class="card-body d-flex flex-column justify-content-around pt-4 pb-0">
      <div v-for="(nameInfo, index) in ficha.names" :key="index">
        <h4 class="card-text">
          {{ nameInfo.name }}
        </h4>
      </div>
      <div class="numbers d-flex flex-row justify-content-between">
        <span class="card-id rounded">#{{ ficha.id }}</span>
        <span class="card-date">{{ ficha.date }}</span>
      </div>
      <p class="card-adress">{{ ficha.address }}</p>
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


.numbers{
  width: 70%;
  padding: 5px;
}

.card-text{
  font-weight: 700;
  color: #546280;
  padding: 5px;
}

.card-id{
  background-color:#82C3F0;
  padding: 10px 8px;
  color: #ffff;
  font-size: 1rem;
  font-weight: 600;

}

.card-date{
  font-size: 1rem;
  font-weight: 600;
  color:  #546280;
}

.card-body{
  display: flex;
  flex-direction: column;
  justify-content: space-around
}

.card-date{
  margin-right: 2.5%;
  padding: 7px 8px;
  color: #546280;
  font-weight: 800;
}

.card-adress{
  font-size: 1rem;
  font-weight: 700;
  color: #727E97;
  padding: 5px;
}


.ficha {
  max-width: 440px;
  height: 300px;
}

.card-footer{
  display: flex;
  align-items: center;
  background-color: transparent;
  height: 100px;
}


</style>
