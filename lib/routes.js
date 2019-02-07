'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Funcs = require('./modules/Funcs');

var _Funcs2 = _interopRequireDefault(_Funcs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    res.send('Not now, i\'m too busy');
});

router.get('/testPage', async function (req, res) {

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

// App routes
router.get('/getLikes', async function (req, res) {

    var id = req.query.id ? req.query.id : null;
    var url = req.query.url ? req.query.url : null;
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

router.get('/getShares', async function (req, res) {

    var id = req.query.id ? req.query.id : null;
    var url = req.query.url ? req.query.url : null;;

    try {
        var data = await _Funcs2.default.getSharesFromID(id, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url, ' : ', e);
        var re = {
            err: e
        };
        res.send(re);
    }
});

router.get('/getFrinds', async function (req, res) {

    var name = req.query.name ? req.query.name : null;
    var url = req.query.url ? req.query.url : null;

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

module.exports = router;