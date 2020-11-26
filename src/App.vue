<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("IMPORT_HOSPITALS");
    this.$store.dispatch("IMPORT_DONATORS");
  }
};
</script>
