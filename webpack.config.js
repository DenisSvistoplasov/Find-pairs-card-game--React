const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlagin = require('html-webpack-plugin');

function absPath(pth) {
  return path.resolve(__dirname, pth);
}

const NODE_ENV = process.env.NODE_ENV;
const mode = NODE_ENV ? NODE_ENV : 'development';
const isProd = mode === 'production';
const isPreDeploy = !!process.env.PRE_DEPLOY;
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  mode: mode,

  entry: absPath('src/index.js'),
  output: {
    path: absPath('dist'),
    filename: 'index.js',
    publicPath: isPreDeploy ? '' : '/dist/',
  },

  module: {
    rules: [
      {
        test: /\.s?[ca]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /(?<!global)\.s?[ca]ss$/i,
                localIdentName: isProd ? '[hash:base64]' : '[name]__[local]'
              }
            }
          },
          'sass-loader'
        ]
      },

      {
        test: /\.[tj]sx?$/i,
        exclude: /node_modules/,
        use: 'ts-loader'
      },

      {
        test: /\.(png|jpe?g|svg|webp|gif)$/i,
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     outputPath: 'image',
        //     publicPath: 'static/image',
        //     name: '[name].[ext]',
        //   }
        // }
        type: 'asset/resource',
        generator: {
          // publicPath: '/image/',
          filename: "image/[name][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          // publicPath: '/static/fonts/',
          filename: 'fonts/[name][ext]',
        }
      }
    ]
  },

  optimization: {
    minimize: isProd
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlagin()
  ],

  devtool: isProd ? false : 'source-map'


};