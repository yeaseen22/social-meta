const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// const {
//     wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
// module.exports = wrapWithReanimatedMetroConfig(mergeConfig(getDefaultConfig(__dirname), config));

// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// const exclusionList = require('metro-config/src/defaults/exclusionList');

// module.exports = mergeConfig(getDefaultConfig(__dirname), {
//   watchFolders: [
//     __dirname, // Ensure Metro only watches the project folder
//   ],
//   resolver: {
//     blockList: exclusionList([
//       /node_modules\/.*\/node_modules\/react-native\/.*/, // Exclude nested node_modules
//       /\.log$/, // Ignore log files
//     ]),
//   },
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         inlineRequires: true,
//         experimentalImportSupport: false,
//       },
//     }),
//   },
//   maxWorkers: 1, // Reduce workers to reduce concurrent file watching
// });
