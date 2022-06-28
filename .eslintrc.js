module.exports = {
   "env": {
      "es2021": true,
      "node": true
   },
   "extends": "eslint:recommended",
   "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
   },
   "rules": {
      "indent": [
         "error",
         3
      ],
      "linebreak-style": [
         "error",
         "windows"
      ],
      "quotes": [
         "error",
         "double"
      ],
      "semi": [
         "error",
         "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
         "error", "always"
      ],
      "arrow-spacing": [
         "error", { "before": true, "after": true }
      ]
   }
}
