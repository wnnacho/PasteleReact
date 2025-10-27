const path = require('path');

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/components/**/*.spec.jsx',
      'src/pages/**/*.spec.jsx'
    ],
    preprocessors: {
      'src/components/**/*.spec.jsx': ['webpack'],
      'src/pages/**/*.spec.jsx': ['webpack']
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpe?g|webp|gif|svg)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[hash][ext][query]'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      }
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    mime: {
      'text/x-jsx': ['jsx']
    }
  });
};
