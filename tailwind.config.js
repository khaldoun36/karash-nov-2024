/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
        borderWidth: {
            DEFAULT: "1.5px",
        },
        extend: {
            fontSize: {
                "4.5xl": ["2.75rem", "3.25rem"],
                "7.5xl": ["5rem", "1"],
            },
            colors: {
                primary: {
                    50: "#f9f4ed",
                    100: "#f1e4d0",
                    200: "#e4c9a4",
                    300: "#d4a670",
                    400: "#c68749",
                    500: "#b06f39",
                    600: "#9d5931",
                    700: "#7e432a",
                    800: "#6a3729",
                    900: "#5b3128",
                    950: "#341814",
                },
            },
        },
    },
    plugins: [],
};
