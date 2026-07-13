import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://redesign.rangeway.co",
  build: {
    format: "directory",
  },
});
