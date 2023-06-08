/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                "10%": "10%",
                "20%": "20%",
                "30%": "30%",
                "40%": "40%",
                "50%": "50%",
                "60%": "60%",
                "70%": "70%",
                "80%": "80%",
                "90%": "90%",
                "100%": "100%",
                "100vh": "100vh",
            },
            fontWeight: {
                "extra-light": "100px",
                light: "300px",
                normal: "400px",
                medium: "500px",
                "semi-bold": "600px",
                bold: "700px",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [],
};
