module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended","plugin:react/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser":"babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};