<template>
  <div>
    <v-container>
      <div class="upper-bottom-space">
        <h2 class="center-text upper-bottom-space">Text translation</h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
        <v-select :items="items" label="Outlined style" outlined></v-select>
      </div>
    </v-container>
    <TranslateModal />
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
    items: ['academic', 'student', 'advocate', 'production'],
  }),
};
</script>

<style scoped>
.upper-bottom-space {
  padding: 15px 0;
}
</style>
