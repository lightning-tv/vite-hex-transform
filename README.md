# Vite Plugin: Hex Color Transform

## Overview

The `hexColorTransform` plugin for Vite transforms `"#RRGGBB"`, `"#RGB"`, `"#RRGGBBAA"`, and `"#RGBA"` into `0xRRGGBBAA` format and handling optional alpha values correctly. This documentation provides instructions for configuring the plugin with include and exclude filters.

## Removing hexColor

If you were using hexColor, you can find and replace all instances with:

Use VSCode to remove hexColor
```js
hexColor\("(#[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})"\)
"$1"
```

Additionally, Enable `default color decorators` in VScode in your settings (Command + , to search for the setting) to get built in color highlighting


## Installation

```sh
npm i @lightningtv/vite-hex-transform -D
```

## Usage

### Plugin Configuration

Create or update the `vite.config.js` file in your Vite project to include the `hexColorTransform` plugin with options for including and excluding files.

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import hexColorTransform from './hexColorTransform';

export default defineConfig({
  plugins: [
    hexColorTransform({
      include: '**/*.js', // Include all JavaScript files
      exclude: 'node_modules/**', // Exclude files in node_modules directory
    }), // Register your custom plugin with options
  ],
});
```

### Plugin Options

The `hexColorTransform` plugin accepts an options object with the following properties:

- `include`: A glob pattern or an array of glob patterns specifying which files to include. The default is to include all files.
- `exclude`: A glob pattern or an array of glob patterns specifying which files to exclude. The default is to exclude no files.

#### Example

Here are some examples of how to use the `include` and `exclude` options:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import hexColorTransform from './hexColorTransform';

export default defineConfig({
  plugins: [
    // Include all JavaScript files and exclude files in node_modules directory
    hexColorTransform({
      include: '**/*.js',
      exclude: 'node_modules/**',
    }),

    // Include only specific files
    hexColorTransform({
      include: ['src/**/*.js', 'src/**/*.ts'], // Include JavaScript and TypeScript files in the src directory
      exclude: 'src/ignore-this-directory/**', // Exclude a specific directory
    }),
  ],
});
```

### How It Works

### Example Code Transformation

#### Before

```javascript
const color = "#f6f6f6";
const shortColor = '#fff';
const alphaColor = "#f6f6f680";
```

#### After

```javascript
const color = 0xF6F6F6FF;
const shortColor = 0xFFFFFFFF;
const alphaColor = 0xF6F6F680;
```

## Conclusion

The `hexColorTransform` plugin for Vite provides a convenient way to transform hex color strings in your code. By configuring include and exclude patterns, you can control which files are processed by the plugin, making it flexible and easy to use in various project setups.

For more information and advanced configuration options, refer to the official Vite documentation and the plugin source code.
