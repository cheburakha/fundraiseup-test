const path = require('path');
const fs = require('fs');

module.exports = [
  {
    name: 'server',
    entry: './apps/server/src/main.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    stats: 'summary',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    name: 'tracker-service',
    entry: './apps/tracker-service/src/main.ts',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    stats: 'summary',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
      filename: 'tracker-service.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    name: 'tracker-client',
    entry: './apps/tracker-client/src/index.ts',
    target: 'web', // by default
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    stats: 'summary',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    output: {
      filename: 'tracker-client-bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
];
