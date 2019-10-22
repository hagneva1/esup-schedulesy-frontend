import Vue from 'vue';
import moment from 'moment';

export default {
  namespaced: true,
  state: {
    userEvents: {},
  },
  getters: {
    getEvents: (state) => {
      if (state.userEvents.events && state.userEvents.events.length) {
        return state.userEvents.events.map(event => ({
          ...event,
          ...{
            start: `${moment(event.date, 'DD/MM/YYYY').format().substring(0, 10)} ${event.startHour}`,
            end: `${moment(event.date, 'DD/MM/YYYY').format().substring(0, 10)} ${event.endHour}`,
          },
        }));
      }
      return [];
    },
    getEventsInstructors: state => state.userEvents.instructors ? state.userEvents.instructors : null,
    getEventsClassrooms: state => state.userEvents.classrooms ? state.userEvents.classrooms : null,
    getEventsTrainees: state => state.userEvents.trainees ? state.userEvents.trainees : null,
    getEventsCategory5: state => state.userEvents.category5 ? state.userEvents.category5 : null,
  },
  actions: {
    loadUserEvents: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
      Vue.axios
        .get(`${process.env.VUE_APP_BACKEND_API_URL}/calendar/${rootGetters['auth/getLogin']}.json`)
        .then(response => response.data.events)
        .then((events) => {
          commit('LOAD_USER_EVENTS', events);
          resolve();
        }).catch(error => reject(error));
    }),
  },
  mutations: {
    LOAD_USER_EVENTS: (state, payload) => { state.userEvents = payload; },
  },
};