/*
-Configuración de Vuex para manejar el estado de la aplicación.
-Define el estado inicial de las fichas y el estado activo.
-Mutaciones y acciones para acceder a dicho estado.
*/

import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      fichas: [],
      estadoActivo: 'CONFIRMADA',
    };
  },
  mutations: {
    setFichas(state, fichas) {
      state.fichas = fichas;
    },
    setEstadoActivo(state, estado) {
      state.estadoActivo = estado;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    pagarFicha(state, { id, tipo }) {
      const fichaIndex = state.fichas.findIndex(f => f.id === id);
      if (fichaIndex !== -1) {
        state.fichas[fichaIndex][tipo] = true;
      }
    },
    updateFicha(state, { fichaIndex, ficha }) {
      state.fichas.splice(fichaIndex, 1, ficha);
    },

  },
  actions: {
    async fetchFichas({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response = await fetch('https://run.mocky.io/v3/726d45d4-2b3f-4035-ad38-ce379c592690');
        if (!response.ok) throw new Error('Error al cargar los datos');
        const data = await response.json();
        commit('setFichas', data);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },
    pagarFicha({ commit, state }, { id, tipo }) {
      const fichaIndex = state.fichas.findIndex(f => f.id === id);
      if (fichaIndex !== -1) {
        const ficha = { ...state.fichas[fichaIndex] };
        ficha[tipo.toLowerCase()] = true;
        commit('updateFicha', { fichaIndex, ficha });
      }
    },
  },
});
