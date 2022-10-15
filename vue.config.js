const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.output.filename = "js/[name].[contenthash:8].min.js";
      config.output.chunkFilename = "js/[name].[contenthash:8].min.js";
    } else {
      config.output.filename = "js/[name].es.js";
      config.output.chunkFilename = "js/[name].es.js";
    }
  },
});
