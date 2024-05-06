module.exports = {
    extends: "airbnb-base",
    env: {
        jest: true,
        node: true
    },
    rules: {
        "max-len": ["warn", 200, { "ignoreStrings": true }],
        "no-underscore-dangle": ["warn", { "allow": ["_id"] }],
        "comma-dangle": ["warn", "never"],
        "semi": ["warn", "always"],
        "indent": ["warn", 4],
        "quotes": ["warn", "double"]
    }
};
