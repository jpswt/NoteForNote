/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

	theme: {
		extend: {},
		fontFamily: {
			display: ['Noto Sans'],
			title: ['Josefin Sans'],
			body: ['Noto Sans'],
		},
		flex: {
			2: '2 2 0%',
			3: '3 3 0%',
			4: '4 4 0%',
			6: '6 6 0%',
			8: '8 8 0%',
			9: '9 9 0%',
		},
		flexGrow: {
			3: '3',
			6: '6',
			9: '9',
		},
		backgroundImage: {
			login:
				"url('https://img.freepik.com/free-vector/music-notes-stave-staff_1284-44373.jpg?w=996&t=st=1679327868~exp=1679328468~hmac=3ac1da87f88ccc169b7c1f2a9f3977b517b57f24753ddde78608c6360cd4cecf')",
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
