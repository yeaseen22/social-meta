const Setting = require('../models/Setting');

// Load Settings by UserId..
exports.loadThemeByUserId = function(req, res){
    const userId = String(req.user._id);

    Setting.find({userId: userId}).exec((err, docs) => {
        if (err) return res.status(400).send(err);

        const onlyThemeMode = docs[0].themeMode;
        res.status(200).send(onlyThemeMode);
    });
};

// Updating any themeMode..
exports.updateThemeMode = function(req, res){
    const settingId = req.query.settingId;
    const settings = new Setting(req.body);

    console.log(settings);

    Setting.findByIdAndUpdate({ _id: settingId }, { themeMode: settings.themeMode }, { new: true })
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
