const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require('flowbite/plugin'),
    require("daisyui")
  ],
  daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#132d63',
					secondary: '#141414',
					accent: '#FFFFFF',
					neutral: '#2a323c',
					'base-100': '#1d232a',
					info: '#3abff8',
					success: '#6dff00',
					warning: '#fde047',
					error: '#f0231c'
				}
			}
		]
  },
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary:{
					50: "#132d63",
					100: "#132d63",
					200: "#132d63",
					300: "#132d63",
					400: "#132d63",
					500: "#132d63",
					600: "#132d63",
					700: "#132d63",
					800: "#132d63",
					900: "#132d63",
				},
      }
    }
  }
};

module.exports = config;