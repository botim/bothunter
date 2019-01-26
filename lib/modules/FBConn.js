'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fb = require('fb');

var _fb2 = _interopRequireDefault(_fb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* Register an app with facebook developers to get access
* https://developers.facebook.com/
*
* Add your access credentials here:
* */
var cred = {
    id: '306004383378464', // "YOUR APP ID GOES HERE", //
    secret: '490ac572bea1fe90678e889cbe342594' // 'YOIUR APP SECERET GOES HERE'//
};

var FBConn = function () {
    /*
    * Get access token on init
    * */

    function FBConn() {
        var _this = this;

        _classCallCheck(this, FBConn);

        _fb2.default.api('oauth/access_token', {
            client_id: cred.id,
            client_secret: cred.secret,
            grant_type: 'client_credentials'
        }, function (res) {
            _this.access_token = !res || res.error ? null : res.access_token;
        });
    }

    /*
    Trying to get likes Etc. from a public page (if you aren't the owner) requires special approval from Facebook:
        (#10) To use 'Page Public Content Access', your use of this endpoint must be reviewed and approved by Facebook.
       To submit this 'Page Public Content Access' feature for review  -
       please read our documentation on reviewable features: https://developers.facebook.com/docs/apps/review.
     **/


    _createClass(FBConn, [{
        key: 'getLikes',
        value: function getLikes(str) {
            if (this.access_token) {
                _fb2.default.api("/" + str + "/?access_token=" + this.access_token, function (response) {
                    console.log('response: ', response.error ? response.error : response);
                    return response.error ? response.error : response;
                });
            } else {
                console.log('No Token');
            }
        }
    }, {
        key: 'getUser',
        value: function getUser(userId) {
            if (this.access_token) {
                _fb2.default.api("/" + userId + "/?access_token=" + this.access_token, function (response) {
                    console.log('response: ', response.error ? response.error : response);
                    return response.error ? response.error : response;
                });
            } else {
                console.log('No Token');
            }
        }
    }]);

    return FBConn;
}();

module.exports = new FBConn();