<template>
  <div class="main-page">
    <div class="text-container">
      <v-container>
        <div class="upper-bottom-space">
          <h2 class="center-text upper-bottom-space">Text translation</h2>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
          <h4 v-if="singleSelect == 'student'">Yes it is student</h4>
          
          <p>selected item is: {{ singleSelect }}</p>
          <v-select
            @input="redirectIndicator"
            v-model="singleSelect"
            :items="items"
            label="Outlined style"
            class="border-2 border-gray-200 rounded-lg px-3 py-2 text-sm w-full font-medium focus:outline-none focus:shadow-outline"
          ></v-select>

          <v-select
            v-model="favorites"
            :items="states"
            label="Select"
            multiple
            hint="Pick your favorite states"
            persistent-hint
            attach
          ></v-select>
        </div>
      </v-container>
    </div>
    <div class="translate-lang">
      <TranslateModal />
    </div>
  </div>
</template>

<script>
import TranslateModal from "./TranslateModal";

export default {
  name: "HelloWorld",
  components: {
    TranslateModal,
  },
  data: () => ({
    singleSelect: "",
    items: ["academic", "student", "advocate", "production"],
    favorites: [],
    states: [
      "measure",
      "investment",
      "consultants",
      "planning",
      "decisions",
      "Gender",
      "features",
      "relative",
    ],
  }),
  methods: {
    redirectIndicator(name) {
      console.log("name", name);
    },
  },
};
</script>

<style scoped>
.upper-bottom-space {
  padding: 15px 0;
}
.main-page {
  display: flex;
  width: 100%;
}
.translate-lang {
  width: 15%;
}
.text-container {
  padding-right: 10%;
  width: 85%;
}
</style>
