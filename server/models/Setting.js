// Setting Model..
const mongoose = require('mongoose');

// settings Schema..
const settingSchema = mongoose.Schema({
    userId: { type: String, required: false },
    themeMode: { type: Object, required: false },
}, {
    timestamps: true
});

// setting Model..
const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
