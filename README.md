# Vite Plugin to Convert hex colors to 0xRRGGBBAA format

If you were using hexColor, you can find and replace all instances with:

Use VSCode to remove hexColor
```js
hexColor\("(#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})"\)
"$1"
```

Additionally, Enable `default color decorators` in VScode in your settings (Command + , to search for the setting) to get built in color highlighting


## Install

`npm i @lightningtv/vite-hex-transform -D`

```js
import hexColorTransform from "@lightningtv/vite-hex-transform";

export default defineConfig({
  plugins: [
    hexColorTransform(),
    ...
  ],
  ...
})

```