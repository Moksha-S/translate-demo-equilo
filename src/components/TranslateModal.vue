<template>
  <!-- <b-modal
    id="translate-modal"
    size="xl"
    title="Translate site"
    hide-backdrop
    scrollable
  > -->
  <Translator
    :countries="countries"
    
    />
    <!-- @on-country-click="hideModal" -->
  <!-- </b-modal> -->
</template>

<script>
import { Translator } from "vue-google-translate";
export default {
  name: "TranslateModal",
  components: {
    Translator,
  },
  data() {
    return {
      countries: [
        {
          code: "en|zh-CN",
          title: "Chinese (Simplified)",
        },
        {
          code: "en|en",
          title: "English",
        },
        {
          code: "en|fr",
          title: "French",
        },
        {
          code: "en|de",
          title: "German",
        },
        {
          code: "en|it",
          title: "Italian",
        },
        {
          code: "en|ru",
          title: "Russian",
        },
        {
          code: "en|es",
          title: "Spanish",
        },
        {
          code: "en|iw",
          title: "Hebrew",
          flagIconUrl: "https://flagicons.lipis.dev/flags/4x3/il.svg",
          altText: "Hebrew language translation",
        },
      ],
    };
  },
  methods: {
    // hideModal() {
    //   this.$bvModal.hide("translate-modal");
    // },
  },
};
</script>

<style scoped>
.skiptranslate {
  display: none !important;
}

.hide-translator {
  height: 0px;
  width: 0px;
  max-width: 0px;
  max-height: 0px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: scale(0);
}
.VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc{
  display: none;
}
</style>
