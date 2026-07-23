import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://preview.rangeway.co",
  build: {
    format: "directory",
  },
});
