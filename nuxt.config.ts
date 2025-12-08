// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/styles/main.scss"],
  components: [
    { path: "~/components", pathPrefix: false, extensions: ["vue"] },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/foundations/variables" as *; @use "~/styles/foundations/functions" as *; @use "~/styles/foundations/mixins" as *;`,
        },
      },
    },
    optimizeDeps: {
      include: ["react-compiler-runtime", "react", "react-dom"],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:4000",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/sanity",
  ],

  sanity: {
    projectId: "hi3cpzph",
    dataset: "production",
    visualEditing: {
      token: process.env.NUXT_SANITY_API_TOKEN,
      studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
      stega: false,
    },
  },
});
