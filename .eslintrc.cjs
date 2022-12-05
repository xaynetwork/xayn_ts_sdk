module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    // This is the root .eslintrc don't look for addition ones in the parent folder.
    root: true,
};
