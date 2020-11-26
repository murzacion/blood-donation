import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hospitals: [],
    donators: []
  },
  getters: {
    getHospitals: state => {
      return state.hospitals;
    },
    getDonators: state => {
      return state.donators;
    }
  },
  mutations: {
    importHospitals(state, value) {
      state.hospitals = value;
    },
    importDonators(state, value) {
      state.donators.push(value);
    }
  },
  actions: {
    IMPORT_HOSPITALS({ commit }) {
      firebase
        .database()
        .ref("hospitals/")
        .on("value", function(snapshot) {
          commit("importHospitals", snapshot.toJSON().split(","));
        });
    },
    IMPORT_DONATORS({ commit }) {
      firebase
        .database()
        .ref("users/")
        .on("value", function(snapshot) {
          var keys = Object.keys(snapshot.val());
          //console.log(keys);
          let i = 0;
          snapshot.forEach(s => {
            //console.log(s.val());
            var obj = {
              donorsid: keys[i],
              name: s.val().name,
              hospital: s.val().hospital,
              phone: s.val().phone
            };
            commit("importDonators", obj);
          });
        });
    }
  },
  modules: {}
});
