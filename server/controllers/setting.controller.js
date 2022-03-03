const Setting = require('../models/Setting');

// Updating any themeMode..
exports.updateThemeMode = function(req, res){
    const settingId = req.query.settingId;
    const settings = new Setting(req.body);

    Setting.findByIdAndUpdate({ _id: settingId }, settings, { new: true })
        .then(docs => {
            res.status(200).json({ success: true, docs });
        }).catch(err => {
            res.status(400).json({ success: false, err });
    });
};

// Selecting any themeMode..
exports.selectThemeMode = function(req, res){
    const settings = new Setting(req.body);

    // make with userId..
    // user._id from Auth Middleware from apiRouter..
    const userId = String(req.user._id);
    settings.userId = userId;

    settings.save(function(err, docs){
        if (err) return res.json({ success: false, err });

        res.json({
            success: true,
            docs
        });
    });
};
