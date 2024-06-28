import { createFilter } from 'vite';
export default function hexColorTransform(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: "vite-plugin-hex-color-transform", // Name of the plugin

    transform(code, id) {

      // Check if the file should be included or excluded
      if (!filter(id)) {
        return null;
      }

      // Regular expression to match hexColor("#RRGGBB"), hexColor("#RGB"), hexColor("#RRGGBBAA"), and hexColor("#RGBA")
      const hexColorRegex =
        /["']#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})["']/g;

      // Function to convert hex color string to 0xRRGGBBAA format
      const convertHexTo0x = (match, p1) => {
        let hex = p1; // Extract the hex part from the match

        // If it's a shorthand hex color (#RGB or #RGBA), expand it to #RRGGBB or #RRGGBBAA
        if (hex.length === 3) {
          hex =
            hex
              .split("")
              .map((char) => char + char)
              .join("") + "FF";
        } else if (hex.length === 4) {
          const alpha = hex[3] + hex[3];
          hex =
            hex
              .slice(0, 3)
              .split("")
              .map((char) => char + char)
              .join("") + alpha;
        } else if (hex.length === 6) {
          hex += "FF"; // Append 'FF' for full opacity if no alpha is provided
        }

        // Convert to 0xRRGGBBAA format
        return `0x${hex.toUpperCase()}`;
      };

      // Replace hexColor function wrapper in the code
      const transformedCode = code.replace(hexColorRegex, convertHexTo0x);

      return {
        code: transformedCode,
        map: null, // Provide source map if necessary
      };
    },
  };
}
