
# Development notes

## VSCode

By default VSCode comes with basic TypeScript support.
To get a better experience it's recommended to install
following modules:

- `ESLint` (dbaeumer.vscode-eslint)
    - set `eslint.format.enable` to `true`.
- `Prettier` (esbenp.prettier-vscode)
    - configure prettier as default formatter for typescript
      by adding following to your workspace `setting.json`

      ```json
      {
        "[typescript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.tabSize": 2
        },
        "[javascript]": {
            "editor.defaultFormatter": "esbenp.prettier-vscode",
            "editor.tabSize": 2
        }
      }
      ```
    - you might also want to consider configuring format on
      save and similar features for typescript and javascript
