var WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
      filename: "./dist/bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
      loaders: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          { test: /\.tsx?$/, loader: "ts-loader" }
      ],

      preLoaders: [
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { test: /\.js$/, loader: "source-map-loader" }
      ]
  },
  plugins: [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    // new WebpackNotifierPlugin({ alwaysNotify: true }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      }
    ])
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
};

// var webpack = require('webpack');
// var path = require('path');
// var WebpackNotifierPlugin = require('webpack-notifier');

// module.exports = {
//   devtool: 'eval',
//   // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
//   entry: [
//     'index.tsx'
//   ],
//   // Output the bundled JS to dist/app.js
//   output: {
//     filename: 'app.js',
//     path: path.resolve('dist')
//   },
//   resolve: {
//     // Look for modules in .ts(x) files first, then .js(x)
//     extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
//     // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
//     modulesDirectories: ['src', 'node_modules'],
//   },
//   module: {
//     loaders: [
//       // .ts(x) files should first pass through the Typescript loader, and then through babel
//       { test: /\.tsx?$/, loaders: ['ts-loader'] }
//     ]
//   },
//   plugins: [
//     // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
//     new WebpackNotifierPlugin({ alwaysNotify: true }),
//   ]
// };