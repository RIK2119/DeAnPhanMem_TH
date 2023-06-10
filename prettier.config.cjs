/** @type {import("prettier").Config} */
const config = {
	endOfLine: "crlf",
	printWidth: 100,
	tabWidth: 4,
	useTabs: true,
	singleQuote: false,
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;

