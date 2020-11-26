<template>
  <v-app-bar app color="red darken-1" dark>
    <div class="xl:hidden">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn @click="goHome()" rounded target="_blank" text>
                <span>Home</span>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <router-link to="/List">
              <v-btn v-if="logged" rounded target="_blank" text>
                <span>Donor list</span>
              </v-btn>
            </router-link>
          </v-list-item>
          <v-list-item v-if="logged">
            <Alert />
          </v-list-item>
          <v-list-item v-if="logged">
            <router-link to="/Profile">
              <v-btn rounded target="_blank" text>
                <span>Profile</span>
              </v-btn>
            </router-link>
          </v-list-item>
          <v-list-item v-if="logged">
            <router-link to="/DonationList">
              <v-btn v-if="logged" rounded target="_blank" text>
                <span>DonationList</span>
              </v-btn>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="d-flex align-center">
      <v-toolbar-title class="text-3xl font-bold">Donate</v-toolbar-title>
    </div>
    <div class="mt-3 ml-5 hidden md:inline">
      <v-btn @click="goHome()" rounded target="_blank" text>
        <span>Home</span>
      </v-btn>
      <router-link to="/List">
        <v-btn v-if="logged" rounded target="_blank" text>
          <span>Donor list</span>
        </v-btn>
      </router-link>
      <router-link to="/Profile">
        <v-btn v-if="logged" rounded target="_blank" text>
          <span>Profile</span>
        </v-btn>
      </router-link>
      <Alert v-if="logged" />
      <DonationForm v-if="logged" />
      <router-link to="/DonationList">
        <v-btn v-if="logged" rounded target="_blank" text>
          <span>DonationList</span>
        </v-btn>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn-toggle rounded background-color="white">
      <v-btn v-if="!logged" @click="goLogin()" target="_blank" text>
        <span class=" text-red-600">Log in</span>
      </v-btn>
      <v-btn v-if="!logged" @click="goRegister()" target="_blank" text>
        <span class=" text-red-600">Sing up</span>
      </v-btn>
      <v-btn v-if="logged" @click="signOut()" target="_blank" text>
        <span class="text-red-600">Sing out</span>
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>
<script>
import Alert from "./Alert";
import DonationForm from "./DonationForm";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Header",
  components: {
    Alert,
    DonationForm
  },
  data() {
    return {
      logged: false,
      dialog: false
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.logged = true;
        } else {
          // No user is signed in.
          this.logged = false;
          console.log("signed out", this.logged);
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Start" });
        });
    },
    goRegister() {
      var router = this.$router;
      router.push({ name: "Register" });
    },
    goLogin() {
      var router = this.$router;
      router.push({ name: "Login" });
    },
    goHome() {
      var router = this.$router;
      router.push({ name: "Start" });
    }
  }
};
</script>
<style scoped>
.v-btn {
  outline: none;
}
.v-toolbar__content {
  padding-left: 0 !important;
}
</style>
