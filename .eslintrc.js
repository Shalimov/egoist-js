module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "plugins": [
        "import",
        "mocha"
    ],
    "rules": {
        "eol-last": [
            "error",
            "always"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "comma-dangle": ["error", "always-multiline"]
    }
};