"use strict";

var _getURL = require('./modules/getURL');

var _getURL2 = _interopRequireDefault(_getURL);

var _Parser = require('./modules/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _FBConn = require('./modules/FBConn');

var _FBConn2 = _interopRequireDefault(_FBConn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('starting');
// let FBConn = require('./modules/FBConn.js');

var testURL = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '10156096314337076',
    user: 'peter.huwel', //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID: '550385403'
};

async function App() {
    console.log('Loading...');

    async function getUserLikesFromPost(postId, fullUrl) {
        var url = postId ? "browse/likes/?id=" + postId : fullUrl;

        await _getURL2.default.loadURL(url).then(function (data) {

            if (data) {
                var users = _Parser2.default.getUserLikesFromPost(data);
                users.list.forEach(function (u) {
                    return console.log(u.name);
                });
                if (users.nextItemsUrl) {
                    getUserLikesFromPost(null, users.nextItemsUrl);
                } else {
                    console.log('End of like list');
                }
            } else {
                console.log('No Data');
            }
        });
    }

    async function getUsersFromComments(postId, fullUrl) {
        var url = postId ? "browse/likes/?id=" + postId : fullUrl;

        await _getURL2.default.loadURL(url).then(function (data) {

            if (data) {
                var users = _Parser2.default.getUserLikesFromPost(data);
                users.list.forEach(function (u) {
                    return console.log(u.name);
                });
                if (users.nextItemsUrl) {
                    getUserLikesFromPost(null, users.nextItemsUrl);
                } else {
                    console.log('End of like list');
                }
            } else {
                console.log('No Data');
            }
        });
    }

    async function getUserFrinds(userName, fullUrl) {
        var url = userName ? userName + '/friends' : fullUrl;
        await _getURL2.default.loadURL(url).then(function (data) {

            if (data) {
                var friends = _Parser2.default.getFriendsListFromUser(data);

                console.log('friends list', friends.list.length);
                console.log('totalFriends: ', friends.total);

                friends.list.forEach(function (f) {
                    return console.log(f.name);
                });

                if (friends.nextItemsUrl) {
                    getUserFrinds(friends.nextItemsUrl);
                } else {
                    console.log('End of friends list');
                }
            }
            if (!data) {
                console.log('No DATA');
            }
        });
    }

    async function testPageLoad(url) {
        await _getURL2.default.loadURL(url).then(function (data) {
            return data;
        });
    }

    // getUserFrinds(testURL.user);
    // getUserLikesFromPost(null, testURL.video);
    // testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

    // FBConn.getLikes(testURL.itemID);
    _FBConn2.default.getUser(testURL.userID);
}

setTimeout(function () {
    return App();
}, 3000);