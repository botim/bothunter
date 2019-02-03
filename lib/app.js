"use strict";

var _Funcs = require('./modules/Funcs');

var _Funcs2 = _interopRequireDefault(_Funcs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 1984;

app.get('/getLikes', async function (req, res) {

    var id = req.query.id ? req.query.id : null;
    var url = req.query.url ? req.query.url : null;
    console.log('getLikes', 'id:', id, 'url:', url);

    try {
        var data = await _Funcs2.default.getLikesFromID(id, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url, ' : ', e);
        var re = {
            err: e
        };
        res.send(re);
    }
});

app.get('/getShares', async function (req, res) {

    var id = req.query.id ? req.query.id : null;
    var url = req.query.url ? req.query.url : null;
    console.log('getShares', 'id:', id, 'url:', url);

    // try {
    var data = await _Funcs2.default.getSharesFromID(id, url);
    res.send(data);
    // } catch (e) {
    //     console.log('error loading ', url ,' : ', e);
    //     const re = {
    //         err: e
    //     };
    //     res.send(re);
    // }
});

app.get('/getFrinds', async function (req, res) {

    var name = req.query.name ? req.query.name : null;
    var url = req.query.url ? req.query.url : null;
    console.log('getFrinds', 'name:', name, 'url:', url);

    try {
        var data = await _Funcs2.default.getUserFrinds(name, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url, ' : ', e);
        var re = {
            err: e
        };
        res.send(re);
    }
});

app.get('/testPage', async function (req, res) {

    var url = req.query.url ? req.query.url : null;
    console.log('testPageLoad', 'name:', name, 'url:', url);

    try {
        var data = await _Funcs2.default.testPageLoad(url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url, ' : ', e);
        var re = {
            err: e
        };
        res.send(re);
    }
});

app.get('/', function (req, res) {
    res.send('Not now, i\'m too busy');
});

app.listen(port, function () {
    return console.log('Botator app listening on port ', port);
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