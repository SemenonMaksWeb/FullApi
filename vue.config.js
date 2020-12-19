module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
  productionSourceMap: false,
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass-mixin/index.sass"`,
      },
    },
  },
};
