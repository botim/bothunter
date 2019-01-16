"use strict";

var _getURL = require('./modules/getURL');

var _getURL2 = _interopRequireDefault(_getURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('starting');
// let FBConn = require('./modules/FBConn.js');

var testURL = {
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: 'browse/likes/?id=10156096314337076',
    user: 'michael.even.54'
};
http://localhost:63342/michael.even.54/friends?lst=100000913008569%3A100032706365015%3A1547682435&refid=17
async function App() {
    // console.log('APP start: ', FBConn.getaccessToken());
    // if (FBConn.getaccessToken()) {
    //     FBConn.getLikes();
    // }
    console.log('Loading...');

    var re = await _getURL2.default.loadURL(testURL.user);

    console.log(re);
}

setTimeout(function () {
    return App();
}, 3000);
