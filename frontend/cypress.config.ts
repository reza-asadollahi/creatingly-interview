import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:4200",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false
  },
});
