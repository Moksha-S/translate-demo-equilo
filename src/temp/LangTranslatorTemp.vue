<template>
  <Translator :countries="countries" class="hide-translator" />
</template>
<script>
import { Translator } from "vue-google-translate";
export default {
  name: "LangTranslator",
  props: {
    languagePreference: String,
  },
  components: {
    Translator,
  },
  data() {
    return {
      user: [],
      countries: [
        {
          code: "en|af",
          title: "Afrikaans",
        },
        {
          code: "en|sq",
          title: "Albanian",
        },
        {
          code: "en|am",
          title: "Amharic",
        },
        {
          code: "en|ar",
          title: "Arabic",
        },
        {
          code: "en|hy",
          title: "Armenian",
        },
        {
          code: "en|as",
          title: "Assamese",
        },
        {
          code: "en|ay",
          title: "Aymara",
        },
        {
          code: "en|az",
          title: "Azerbaijani",
        },
        {
          code: "en|bm",
          title: "Bambara",
        },
        {
          code: "en|eu",
          title: "Basque",
        },
        {
          code: "en|be",
          title: "Belarusian",
        },
        {
          code: "en|bn",
          title: "Bengali",
        },
        {
          code: "en|bho",
          title: "Bhojpuri",
        },
        {
          code: "en|bs",
          title: "Bosnian",
        },
        {
          code: "en|bg",
          title: "Bulgarian",
        },
        {
          code: "en|ca",
          title: "Catalan",
        },
        {
          code: "en|ceb",
          title: "Cebuano",
        },
        {
          code: "en|zh-CN",
          title: "Chinese (Simplified)",
        },
        {
          code: "en|zh-TW",
          title: "Chinese (Traditional)",
        },
        {
          code: "en|co",
          title: "Corsican",
        },
        {
          code: "en|hr",
          title: "Croatian",
        },
        {
          code: "en|cs",
          title: "Czech",
        },
        {
          code: "en|da",
          title: "Danish",
        },
        {
          code: "en|dv",
          title: "Dhivehi",
        },
        {
          code: "en|doi",
          title: "Dogri",
        },
        {
          code: "en|nl",
          title: "Dutch",
        },
        {
          code: "en|en",
          title: "English",
        },
        {
          code: "en|eo",
          title: "Esperanto",
        },
        {
          code: "en|et",
          title: "Estonian",
        },
        {
          code: "en|ee",
          title: "Ewe",
        },
        {
          code: "en|tl",
          title: "Filipino",
        },
        {
          code: "en|fi",
          title: "Finnish",
        },
        {
          code: "en|fr",
          title: "French",
        },
        {
          code: "en|fy",
          title: "Frisian",
        },
        {
          code: "en|gl",
          title: "Galician",
        },
        {
          code: "en|ka",
          title: "Georgian",
        },
        {
          code: "en|de",
          title: "German",
        },
        {
          code: "en|el",
          title: "Greek",
        },
        {
          code: "en|gn",
          title: "Guarani",
        },
        {
          code: "en|gu",
          title: "Gujarati",
        },
        {
          code: "en|ht",
          title: "Haitian Creole",
        },
        {
          code: "en|ha",
          title: "Hausa",
        },
        {
          code: "en|haw",
          title: "Hawaiian",
        },
        {
          code: "en|he",
          title: "Hebrew",
        },
        {
          code: "en|hi",
          title: "Hindi",
        },
        {
          code: "en|hmn",
          title: "Hmong",
        },
        {
          code: "en|hu",
          title: "Hungarian",
        },
        {
          code: "en|is",
          title: "Icelandic",
        },
        {
          code: "en|ig",
          title: "Igbo",
        },
        {
          code: "en|ilo",
          title: "Ilocano",
        },
        {
          code: "en|id",
          title: "Indonesian",
        },
        {
          code: "en|ga",
          title: "Irish",
        },
        {
          code: "en|it",
          title: "Italian",
        },
        {
          code: "en|ja",
          title: "Japanese",
        },
        {
          code: "en|jv",
          title: "Javanese",
        },
        {
          code: "en|kn",
          title: "Kannada",
        },
        {
          code: "en|kk",
          title: "Kazakh",
        },
        {
          code: "en|km",
          title: "Khmer",
        },
        {
          code: "en|gom",
          title: "Kinyarwanda",
        },
        {
          code: "en|rw",
          title: "Konkani",
        },
        {
          code: "en|ko",
          title: "Korean",
        },
        {
          code: "en|kri",
          title: "Krio",
        },
        {
          code: "en|ku",
          title: "Kurdish",
        },
        {
          code: "en|ckb",
          title: "Kurdish (Sorani)",
        },
        {
          code: "en|ky",
          title: "Kyrgyz",
        },
        {
          code: "en|lo",
          title: "Lao",
        },
        {
          code: "en|la",
          title: "Latin",
        },
        {
          code: "en|lv",
          title: "Latvian",
        },
        {
          code: "en|ln",
          title: "Lingala",
        },
        {
          code: "en|lt",
          title: "Lithuanian",
        },
        {
          code: "en|lg",
          title: "Luganda",
        },
        {
          code: "en|lb",
          title: "Luxembourgish",
        },
        {
          code: "en|mk",
          title: "Macedonian",
        },
        {
          code: "en|mai",
          title: "Maithili",
        },
        {
          code: "en|mg",
          title: "Malagasy",
        },
        {
          code: "en|ms",
          title: "Malay",
        },
        {
          code: "en|ml",
          title: "Malayalam",
        },
        {
          code: "en|mt",
          title: "Maltese",
        },
        {
          code: "en|mi",
          title: "Maori",
        },
        {
          code: "en|mr",
          title: "Marathi",
        },
        {
          code: "en|mni-Mtei",
          title: "Meiteilon (Manipuri)",
        },
        {
          code: "en|lus",
          title: "Mizo",
        },
        {
          code: "en|mn",
          title: "Mongolian",
        },
        {
          code: "en|my",
          title: "Myanmar (Burmese)",
        },
        {
          code: "en|ne",
          title: "Nepali",
        },
        {
          code: "en|no",
          title: "Norwegian",
        },
        {
          code: "en|ny",
          title: "Nyanja (Chichewa)",
        },
        {
          code: "en|or",
          title: "Odia (Oriya)",
        },
        {
          code: "en|om",
          title: "Oromo",
        },
        {
          code: "en|ps",
          title: "Pashto",
        },
        {
          code: "en|fa",
          title: "Persian",
        },
        {
          code: "en|pl",
          title: "Polish",
        },
        {
          code: "en|pt",
          title: "Portuguese",
        },
        {
          code: "en|pa",
          title: "Punjabi",
        },
        {
          code: "en|qu",
          title: "Quechua",
        },
        {
          code: "en|ro",
          title: "Romanian",
        },
        {
          code: "en|ru",
          title: "Russian",
        },
        {
          code: "en|sm",
          title: "Samoan",
        },
        {
          code: "en|sa",
          title: "Sanskrit",
        },
        {
          code: "en|gd",
          title: "Scots Gaelic",
        },
        {
          code: "en|nso",
          title: "Sepedi",
        },
        {
          code: "en|sr",
          title: "Serbian",
        },
        {
          code: "en|st",
          title: "Sesotho",
        },
        {
          code: "en|sn",
          title: "Shona",
        },
        {
          code: "en|sd",
          title: "Sindhi",
        },
        {
          code: "en|si",
          title: "Sinhala (Sinhalese)",
        },
        {
          code: "en|sk",
          title: "Slovak",
        },
        {
          code: "en|sl",
          title: "Slovenian",
        },
        {
          code: "en|so",
          title: "Somali",
        },
        {
          code: "en|es",
          title: "Spanish",
        },
        {
          code: "en|su",
          title: "Sundanese",
        },
        {
          code: "en|sw",
          title: "Swahili",
        },
        {
          code: "en|sv",
          title: "Swedish",
        },
        {
          code: "en|tg",
          title: "Tajik",
        },
        {
          code: "en|ta",
          title: "Tamil",
        },
        {
          code: "en|tt",
          title: "Tatar",
        },
        {
          code: "en|te",
          title: "Telugu",
        },
        {
          code: "en|th",
          title: "Thai",
        },
        {
          code: "en|ti",
          title: "Tigrinya",
        },
        {
          code: "en|ts",
          title: "Tsonga",
        },
        {
          code: "en|tr",
          title: "Turkish",
        },
        {
          code: "en|tk",
          title: "Turkmen",
        },
        {
          code: "en|ak",
          title: "Twi (Akan)",
        },
        {
          code: "en|uk",
          title: "Ukrainian",
        },
        {
          code: "en|ur",
          title: "Urdu",
        },
        {
          code: "en|ug",
          title: "Uyghur",
        },
        {
          code: "en|uz",
          title: "Uzbek",
        },
        {
          code: "en|vi",
          title: "Vietnamese",
        },
        {
          code: "en|cy",
          title: "Welsh",
        },
        {
          code: "en|xh",
          title: "Xhosa",
        },
        {
          code: "en|yi",
          title: "Yiddish",
        },
        {
          code: "en|yo",
          title: "Yoruba",
        },
        {
          code: "en|zu",
          title: "Zulu",
        },
      ],
    };
  },
  methods: {
    langueage(languagePreference) {
      var rootElement = document.getElementsByTagName("html")[0];
      rootElement.setAttribute("translate", "");
      if (languagePreference == "English") {
        rootElement.setAttribute("translate", "no");
      }
      this.countries.map((item, index) => {
        if (
          item.title == languagePreference &&
          document.getElementsByClassName("language-item").length > 0
        ) {
          document.getElementsByClassName("language-item")[index].click();
        }
      });
    },
  },
  async mounted() {
    this.$watch(
      "languagePreference",
      (languagePreference) => {
        this.langueage(languagePreference);
      },
      { immediate: true }
    );
  },
};
</script>
<style lang="scss">
body {
  top: 0 !important;
}
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
.goog-text-highlight {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
