const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.DATABASE,
    },
    default: {
        SECRET: 'SUPERSECRET',
        DATABASE: 'mongodb://localhost:27017/socialMeta',
    }
};

exports.get = function get(env){
    return config[env] || config.default;
};