<template>
  <div class="inline">
    <Header />
    <div class="pt-6" v-for="d in date" :key="d.name">
      <v-card v-if="date.length > 0" class="mx-auto" max-width="434" tile>
        <v-row align="end" class="fill-height">
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ d.donorid }}
                </v-list-item-title>
                <v-list-item-subtitle class="pt-1">{{
                  d.blood
                }}</v-list-item-subtitle>
                <v-list-item-subtitle class="pt-1">{{
                  d.amount
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn color="green" outlined rounded text>
            Use
          </v-btn>
        </v-card-actions>
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
      date: []
    };
  },
  methods: {
    async getData() {
      let aux = [];
      var database = firebase.database();
      var ref = database.ref("donation");
      ref.on("value", function(snapshot) {
        snapshot.forEach(function(partialSnap) {
          let data = partialSnap.val();
          aux.push(data);
        });
      });
      this.date = aux;
    }
  }
};
</script>
