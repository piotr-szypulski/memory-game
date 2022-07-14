import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';

import 'dotenv/config';

const isProduction = process.env.npm_lifecycle_event === 'prod';

const alias = {
  components: path.resolve(__dirname, 'src/components'),
};

const htmlTemplateConfiguration = {
  title: process.env.APP_NAME,
};

const developmentConfiguration = {
  devServer: {
    hot: true,
    port: process.env.APP_PORT,
  },
  mode: 'development',
};

const productionConfiguration = {
  output: {
    clean: true,
  },
  /**
   * Production optimizations
   */
};

const mainConfiguration = {
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            ...(!isProduction && {
              plugins: [
                'react-refresh/babel',
              ],
            }),
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin(htmlTemplateConfiguration),
    new ReactRefreshWebpackPlugin(),
  ],
  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },
};

export default {
  ...mainConfiguration,
  ...(isProduction ? productionConfiguration : developmentConfiguration),
};
