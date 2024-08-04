import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const nextConfig = {};

const nextTranspileModules = withTM([]);

const customConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/assets/audio/',
          publicPath: '/_next/static/assets/audio/',
        },
      },
    });

    return config;
  },
};

export default withPlugins([nextTranspileModules, customConfig], nextConfig);
