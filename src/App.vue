<template>
  <v-app>
    <NavBar />
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    HelloWorld,
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
