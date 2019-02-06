"use strict";

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getURL = require('./modules/getURL');

var _getURL2 = _interopRequireDefault(_getURL);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 1984;
var appKey = 'welvlmlsorh765cn9d723sa72ew0342';

app.use(function (req, res, next) {

    if (req.query.cookie) {
        var cookie = req.query.cookie;
        _getURL2.default.setcookie(cookie);
    }

    var authorised = req.query.key && req.query.key === appKey;
    console.log('authorised:', authorised);
    next();
    // if (!authorised) {
    //     return res.status(403).send("Unauthorised!");
    // }
    // else {
    //     next();
    // }
});

app.use('/', _routes2.default);

app.listen(port, function () {
    return console.log('Botator app listening on port ', port);
}).setTimeout(500000);

_getURL2.default.init();

process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log('Uncaught Exception: ', err);
});

// getUserFrinds(testData.user);

// getLikesFromID(null, testData.likesFullUrl);
// getSharesFromID(testData.itemID);
// testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

// FB API samples
// FBConn.getLikes(testData.itemID);
// FBConn.getUser(testData.userID);


/*
const testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    likesFullUrl: 'ufi/reaction/profile/browser/?ft_ent_identifier=2027002237395095',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '2027002237395095',
    user: 'peter.huwel',  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID: '550385403'
};
*/