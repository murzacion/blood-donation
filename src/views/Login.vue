<template>
  <section class="flex justify-center items-center pt-20">
    <div class="main-container">
      <div class="d-flex flex-column">
        <span class="header-name font-weight-bold primary--text py-1"
          >Blood</span
        >
        <span class="header-name font-weight-bold primary--text py-1"
          >Donation</span
        >
        <span class="header-name font-weight-bold primary--text py-1"
          >System</span
        >
      </div>
      <v-card max-width="344" class="mx-auto my-4 py-5 px-6">
        <v-form class="pt-5 pb-0">
          <v-text-field
            :rules="rules"
            outlined
            v-model="email"
            type="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            :rules="rules"
            outlined
            v-model="password"
            type="password"
            label="Password"
          ></v-text-field>
        </v-form>
      </v-card>
      <div class="py-2 pr-4 d-flex justify-end">
        <v-btn @click="login()" color="primary">Log in</v-btn>
      </div>
      <div class="d-flex justify-center mt-4">
        <div class="d-flex flex-column">
          <span>Don't have an account?</span>
          <router-link to="/Register">
            <div class="d-flex justify-center">
              <span>Create one</span>
            </div>
          </router-link>
          <span class="text-red-500" v-if="error">{{ error.message }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      rules: [v => !!v || "This field is required"],
      error: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$store.dispatch("IMPORT_DONATORS");
          this.$router.replace({ name: "Profile" });
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  border-radius: 10px;
}
.main-container {
  width: 362px;
}
.header-name {
  font-size: 3rem !important;
  line-height: 3.125rem;
  letter-spacing: normal !important;
}
.error {
  color: red;
  font-size: 18px;
}
</style>
