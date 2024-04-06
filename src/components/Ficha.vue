<template>
  <div class="card ficha mb-3">
    <div class="card-body">
      <div v-for="(nameInfo, index) in ficha.names" :key="index">
        <p class="card-text">
          {{ nameInfo.name }}
        </p>
      </div>
      <h5 class="card-title">{{ ficha.id }}</h5>
      <p class="card-text">{{ ficha.address }}</p>
      <p class="card-text">{{ ficha.date }}</p>
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
.ficha {
  max-width: 540px;
}
</style>
