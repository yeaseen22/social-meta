const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(createProxyMiddleware("/api/*", {
        target: 'http://localhost:8080' || `${process.env.HOST}:${process.env.PORT}`,
        secure: false,
        changeOrigin: true
    }));
};