/*
-Se define el estado global de la aplicación con "state", el cual tiene las siguientes propiedades:
1)fichas: indica un array que alacena las fichas provenientes del endpoint.
2)estadoActivo: registra que la primer solapa a mostrar sea la de "Confirmada".

-Las mutations se encargan de modificar el estado.
1)setFichas: establece el array de "fichas" en el estado con los datos proporcionados del endpoint.
2)setEstadoActivo: camvia el "estadoActivo" actual en el estado (cambio de solapas).
3)setLoading: activa o desactiva el indicador de carga.
4)setError: establece un error en el estado en caso de que salga mal.
5)pagarFicha: encuentra una ficha por su ID y actualiza el estado timbrado o cep a pagado (true).
6)updateFicha: actualiza la ficha que se modifica al clickear el botón "pagar".

-Las actions realizan operaciones asincrónicas y luego realizan mutaciones.
1)fetFichas: carga asincrónicamente las fichas desde el endpoint y luego realiza la mutarion "setFichas" con los datos cargados. Durante el mismo proceso, se usan las mutations setLoading y setError para manejar el estado de carga y errores.
2)pagarFicha: realiza lamutación "pagarFicha" ó "updateFicha" para actualizar el estado de una ficha a pagado.

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
