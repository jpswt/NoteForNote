/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		extend: {},
		fontFamily: {
			display: ['Noto Sans'],
			title: ['Kaushan Script'],
			body: ['Noto Sans'],
		},
		flex: {
			2: '2 2 0%',
			3: '3 3 0%',
			4: '4 4 0%',
			6: '6 6 0%',
			9: '9 9 0%',
		},
		flexGrow: {
			3: '3',
			6: '6',
			9: '9',
		},
		backgroundColor: {
			primary: 'hsl(212,0,0)',
			accent: 'hsl(180,50%,40%)',
		},
		backgroundImage: {
			login:
				"url('https://images.unsplash.com/photo-1581185050956-0e015a2a96cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80')",
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
