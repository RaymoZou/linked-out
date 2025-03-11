/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Lexend", "sans-serif"]
            },
            colors: {
                lightbeige: '#F2F1EB',
                darkbeige: '#FFEAD2',
                lightgreen: '#AFC8AD',
                darkgreen: '#88AB8E',
            },
        }
    },
}

