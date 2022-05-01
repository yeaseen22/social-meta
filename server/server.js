const express = require('./config/express'),
    app = express.init()
    // For configuration file like config/config.js
    // config = require('./config/config').get(process.env.NODE_ENV)
    require('dotenv').config();
    // For Different .env file..
    // require('dotenv').config({ path: `.env.development.local` });

// If with configuration file..
// const HOST = config.HOST;
// const PORT = config.PORT;

// With .env file..
const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Listening to Server..
app.listen(PORT, HOST, () => {
    console.log(`Welcome to -- ${process.env.APP_NAME} -- `);
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
