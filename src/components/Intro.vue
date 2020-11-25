<template>
  <section class="bg-contain ml-8 intro relative">
    <div class="absolute inset-y-60 md:right-80">
      <vue-typer
        :text="[
          'If you want to save lives, join us.\nIf you need help you are where you need to be\nYou will surely find the right person.'
        ]"
        class="leading-loose text-3xl font-black"
      ></vue-typer>
    </div>
  </section>
</template>
<script>
import { VueTyper } from "vue-typer";
export default {
  components: {
    VueTyper
  }
};
</script>
<style lang="scss" scoped>
.intro {
  height: 100%;
  background-image: url(../assets/background.png);
}

.vue-typer {
  position: relative;
  color: #f87171;
}
.vue-typer .custom.char {
  color: #fafafa;
  color: rgba(250, 250, 250, 1);
  font-family: Kanit, sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: #f87171;
}
.vue-typer .custom.char.selected {
  background-color: transparent;
}
.vue-typer .custom.caret {
  line-height: 3.5;
  width: 20px;
  background-color: #fff;
  position: absolute;
  top: -10px;
  right: -8px;
}
.typed {
  color: #f87171 !important;
}
</style>
