<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn target="_blank" v-bind="attrs" v-on="on" text>
        Alert Donation
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Alert</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Text"
                type="text"
                required
                v-model="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-']"
                label="Blood*"
                v-model="blood"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal()">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="saveAlert()">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  data() {
    return {
      dialog: false,
      blood: "",
      text: ""
    };
  },
  mounted() {
    //
  },
  methods: {
    async saveAlert() {
      try {
        (await firebase.auth().currentUser).additionalUserInfo;
        this.addData();
        this.blood = "";
        this.text = "";
        this.dialog = false;
      } catch (err) {
        console.log(err);
      }
    },
    addData() {
      var id;
      firebase
        .database()
        .ref("doctors/" + firebase.auth().currentUser.uid)
        .on("value", function(snapshot) {
          id = snapshot.val()["hospital"];
        });
      firebase
        .database()
        .ref(`alerts/${id}`)
        .push(
          {
            text: this.text,
            blood: this.blood
          },
          error => {
            if (error) {
              alert(error);
            } else {
              alert("Done!");
            }
          }
        );
    },
    closeModal() {
      this.blood = "";
      this.text = "";
      this.dialog = false;
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
