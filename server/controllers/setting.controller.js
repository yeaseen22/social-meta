const Setting = require('../models/Setting');

// Load Settings by UserId..
exports.getThemeMode = function(req, res){
    const userId = String(req.user._id);

    Setting.find({userId: userId}).exec((err, docs) => {
        if (err) return res.status(400).send(err);

        const onlyThemeMode = docs[0].themeMode;
        res.status(200).send(onlyThemeMode);
    });
};

// Updating any themeMode..
exports.updateThemeMode = function(req, res){
    const settings = new Setting(req.body);
    const userId = String(req.user._id);

    Setting.findOneAndUpdate({ userId: userId }, { themeMode: settings.themeMode }, { new: true })
        .then(docs => {
            if(!docs) return res.json({ success: false, msg: 'Settings Theme not found for update!' });

            res.status(200).json({
               ...docs.themeMode
            });
        }).catch(err => {
            res.status(400).json({ success: false, err });
    });
};

// Selecting any themeMode..
exports.setThemeMode = function(req, res){
    const settings = new Setting(req.body);

    // make with userId..
    // user._id from Auth Middleware from apiRouter..
    const userId = String(req.user._id);
    settings.userId = userId;

    settings.save(function(err, docs){
        if (err) return res.json({ success: false, err });
        if (!docs) return res.json({ success: false, msg: 'Settings Themes not found' });

        res.json({
            ...docs.themeMode
        });
    });
};
