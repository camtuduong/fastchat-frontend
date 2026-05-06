import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default [
	...tseslint.configs.recommended,
	{
		plugins: {
			react,
		},
		rules: {
			"react/react-in-jsx-scope": "off",
		},
	},
];
