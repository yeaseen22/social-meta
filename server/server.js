const express = require('./config/express'),
    app = express.init(),
    config = require('./config/config').get(process.env.NODE_ENV)
    require('dotenv').config({ path: `.env.development.local` });

const HOST = config.HOST;
const PORT = config.PORT;

// Listening to Server..
app.listen(PORT, HOST, () => {
    console.log(`Welcome to -- ${process.env.APP_NAME} -- `);
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
