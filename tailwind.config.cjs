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
        primary: '#132c63',
        bhlContent : '#ced0de',
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
  }
};

module.exports = config;