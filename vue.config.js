const path = require('path');



module.exports = {
  devServer: {
    proxy: 'http://localhost:1234'
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].template = path.resolve('./app/frontend/index.html');
        return args;
      });
  },

  configureWebpack: {
    entry: {
      app: './app/frontend/js/index.js'
    },

    performance: false,

    resolve: {
      alias: {
        '@': path.resolve('./app/frontend/js')
      }
    }
  },

  outputDir: 'app/public/dist',

  lintOnSave: false
};
