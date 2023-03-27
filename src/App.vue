<template>
  <v-app>
    <NavBar />
    <v-main>
      <HomeText />
    </v-main>
  </v-app>
</template>

<script>
import HomeText from "./components/HomeText";
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    HomeText,
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
