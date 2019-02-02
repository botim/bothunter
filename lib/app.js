"use strict";

var _getURL = require('./modules/getURL');

var _getURL2 = _interopRequireDefault(_getURL);

var _Parser = require('./modules/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';


var testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    likesFullUrl: 'ufi/reaction/profile/browser/?ft_ent_identifier=2027002237395095',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '2027002237395095',
    user: 'peter.huwel', //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID: '550385403'
};

async function getData(initUrl, functionName, type) {

    var info = {
        list: [],
        total: 0,
        nextItemsUrl: ''
    };

    await _getURL2.default.loadURL(initUrl).then(function (data) {
        console.log('loading: ', initUrl);

        if (data) {
            var tmp = _Parser2.default[functionName](data, type);
            tmp.list.forEach(function (item) {
                return console.log(item);
            });

            info.list = [].concat(_toConsumableArray(info.list), _toConsumableArray(tmp.list));
            info.nextItemsUrl = tmp.nextItemsUrl;
            if (tmp.total) {
                info.total = tmp.total;
            }

            if (info.nextItemsUrl) {
                getData(info.nextItemsUrl, functionName, type);
            } else {
                console.log('End of list');
            }
        } else {
            console.log('No Data');
        }
    });
    return info;
}

async function App() {
    console.log('Loading...');

    /*
    * Sample functions to loop through some data types
    * */

    async function getLikesFromID(postId, fullUrl) {
        var url = postId ? "browse/likes/?id=" + postId : fullUrl;
        getData(url, 'getListByType', 'userLikes');
    }

    async function getSharesFromID(postId, fullUrl) {
        var url = postId ? "browse/shares/?id=" + postId : fullUrl;
        getData(url, 'getListByType', 'shares');
    }

    async function getUserFrinds(userName, fullUrl) {
        var url = userName ? userName + '/friends' : fullUrl;
        getData(url, 'getListByType', 'userFriends');
    }

    async function testPageLoad(url) {
        await _getURL2.default.loadURL(url).then(function (data) {
            return data;
        });
    }

    // getUserFrinds(testData.user);

    getLikesFromID(null, testData.likesFullUrl);
    // getSharesFromID(testData.itemID);
    // testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

    // FB API samples
    // FBConn.getLikes(testData.itemID);
    // FBConn.getUser(testData.userID);
}

setTimeout(function () {
    return App();
}, 3000);