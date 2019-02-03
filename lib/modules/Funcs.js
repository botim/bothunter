"use strict";

var _getURL = require("./getURL");

var _getURL2 = _interopRequireDefault(_getURL);

var _Parser = require("./Parser");

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';

var Iinfo = {
    list: [],
    total: 0,
    nextItemsUrl: '',
    page: '',
    err: ''
};

async function getData(initUrl, functionName, type, _info) {

    var info = _info ? _info : Iinfo;

    console.log('loading URL: ', initUrl);
    await _getURL2.default.loadURL(initUrl).then(async function (data) {

        if (data) {
            var tmp = await _Parser2.default[functionName](data, type);

            if (tmp.err) {
                info.err = tmp.err;
            }

            if (tmp.total) {
                info.total = tmp.total;
            }

            info.list = [].concat(_toConsumableArray(info.list), _toConsumableArray(tmp.list));
            info.nextItemsUrl = tmp.nextItemsUrl;

            if (info.nextItemsUrl) {
                return await getData(info.nextItemsUrl, functionName, type, info);
            } else {
                console.log('End of list');
            }
        } else {
            console.log('No Data');
            info.page = data;
            info.err = 'No Data found';
        }
    });

    return info;
};

module.exports = {

    getLikesFromID: async function getLikesFromID(postId, fullUrl) {
        var url = postId ? "ufi/reaction/profile/browser/?ft_ent_identifier=" + postId : fullUrl;
        return getData(url, 'getListByType', 'userLikes');
    },

    getSharesFromID: async function getSharesFromID(postId, fullUrl) {
        var url = postId ? "browse/shares/?id=" + postId : fullUrl;
        return getData(url, 'getListByType', 'shares');
    },

    getUserFrinds: async function getUserFrinds(userName, fullUrl) {
        var url = userName ? userName + '/friends' : fullUrl;
        return getData(url, 'getListByType', 'userFriends');
    },

    testPageLoad: async function testPageLoad(url) {
        await _getURL2.default.loadURL(url).then(function (data) {
            return data;
        });
    }

};