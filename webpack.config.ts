import path from 'path'
import { Configuration as WPConfig, ModuleOptions } from 'webpack'
import { Configuration as WPDevServerconf } from 'webpack-dev-server'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import { CleanPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const env = require("./.env")

const moduleConf: ModuleOptions = {
  rules: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      },
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ],
}
interface Configuration extends WPConfig {
  devServer?: WPDevServerconf
}
const config: Configuration = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: moduleConf,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[contenthash:8].js',
    publicPath: '/',
  },
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    port: 4000,
    historyApiFallback: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new Dotenv(),
    new CleanPlugin(),
    new HtmlWebpackPlugin({
      title: env.APPNAME, //TODO get name from .env
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
        charset: 'utf-8',
      },
      base: '/',
      templateContent: `
      <html>
        <head></head>
        <body>
          <noscript>You need Javascript enabled to run this app</noscript>
          <div id="root"></div>
        </body>
      </html>`,
    }),
  ],
  optimization: {
    usedExports: true,
  },
}

export default config
