import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.grey.darken4, // #E53935
        secondary: colors.red.lighten1,
        tertiary: "#ff3535",
        branco: "#FBF9FC",
        tabela: "EAEAEA"
      },
    },
  },
});
