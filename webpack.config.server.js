module.exports = {
  mode: 'development',
  target: 'node',
  externals: [
    {
      uws: 'uws',
    }],
  // node: {
  //   net: 'empty',
  //   tls: 'empty',
  //   dns: 'empty',
  //   fs: 'empty',
  // },
  entry: [
    `${__dirname}/src/bin/server.js`,
  ],
  output: {
    path: `${__dirname}/build`,
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
