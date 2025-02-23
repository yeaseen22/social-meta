const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    server: {
        enhanceMiddleware: (middleware) => {
            return (req, res, next) => {
                // 🚀 Redirect to React-Native-Debugger instead of built-in debugger
                if (req.url.includes('/debugger-frontend/rn_fusebox.html')) {
                    res.writeHead(302, {
                        Location: 'http://localhost:8081/debugger-ui',
                    });
                    res.end();
                    return;
                }
                return middleware(req, res, next);
            };
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
