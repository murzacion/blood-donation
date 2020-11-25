<template>
  <div class="inline">
    <Header />
    <div class="pt-6">
      <v-card class="mx-auto" max-width="434" tile>
        <v-row align="end" class="fill-height">
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ date.name + " " + date.surname }}
                </v-list-item-title>
                <v-list-item-subtitle class="pt-1">{{
                  date.email
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="pt-1">{{
                  date.phone
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="pt-1">{{
                  date.city
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="pt-1">{{
                  date.blood
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  components: {
    Header
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    async getData() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .database()
            .ref("users/" + user.uid)
            .on("value", snapshot => {
              const data = snapshot.val() || [];
              this.date = data;
            });
        }
      });
    }
  }
};
</script>
