/* eslint-disable */
const createExpoWebpackConfig = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  env.mode = 'development';
  const config = await createExpoWebpackConfig(env, argv);
  config.resolve.alias['react-native'] = 'react-native-web';
  config.resolve.alias['react-native-maps'] = 'react-native-web-maps';
  return config;
};
