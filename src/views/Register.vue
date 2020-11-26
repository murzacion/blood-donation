<template>
  <section class="flex justify-center items-center pt-20">
    <div class="main-container">
      <span class="header-name font-weight-bold primary--text">Sign Up</span>
      <v-card max-width="600" class="mx-auto my-4 py-5 px-6">
        <v-form class="pt-3 pb-0">
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.name"
            label="Name"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.surname"
            label="Surname"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.email"
            type="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.password"
            type="password"
            label="Password"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.city"
            type="text"
            label="City"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="signUpData.phone"
            label="Phone"
          ></v-text-field>
          <v-select
            :items="items"
            :rules="rules"
            outlined
            v-model="signUpData.hospital"
            label="Hospital"
          ></v-select>
        </v-form>
      </v-card>
      <div class="d-flex justify-space-between py-2">
        <v-btn @click="goBack()" rounded color="primary">Back</v-btn>
        <v-btn @click="singup()" rounded color="primary">Sign Up</v-btn>
      </div>
      <router-link to="/Login">
        <div class="text-center">
          <v-btn text color="primary">I have already account!</v-btn>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
export default {
  data() {
    return {
      rules: [v => !!v || "This field is required"],
      signUpData: {
        email: "",
        password: "",
        name: "",
        surname: "",
        city: "",
        phone: "",
        hospital: ""
      }
    };
  },
  computed: {
    items() {
      return this.$store.getters.getHospitals;
    }
  },
  methods: {
    async singup() {
      try {
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signUpData["email"],
            this.signUpData["password"]
          );
        (await user).additionalUserInfo;
        this.addData();
        this.$router.replace({ name: "Profile" });
      } catch (err) {
        console.log(err);
      }
    },
    addData() {
      firebase
        .database()
        .ref("doctors/" + firebase.auth().currentUser.uid)
        .set(
          {
            email: this.signUpData["email"],
            name: this.signUpData["name"],
            surname: this.signUpData["surname"],
            city: this.signUpData["city"],
            phone: this.signUpData["phone"],
            hospital: this.signUpData["hospital"]
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
    goBack() {
      window.history.back();
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;
}
.main-container {
  width: 600px;
}
#mapid {
  height: px;
}
.header-name {
  font-size: 3rem !important;
  line-height: 3.125rem;
  letter-spacing: normal !important;
}
</style>
