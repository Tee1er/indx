// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	css: ["~/assets/css/main.css"],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	compatibilityDate: "2024-07-14",
	modules: ["@nuxt/icon"],
	routeRules: {
		"/api/v1/**": {
			proxy: { to: "http://127.0.0.1:3391/**" },
		},
	},
});
