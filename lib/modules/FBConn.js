"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fb = require("fb");

var _fb2 = _interopRequireDefault(_fb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cred = {
    id: "306004383378464",
    secret: "490ac572bea1fe90678e889cbe342594"
};

var FBConn = function () {
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

    _createClass(FBConn, [{
        key: "getaccessToken",
        value: function getaccessToken() {
            return this.access_token;
        }
    }, {
        key: "getLikes",
        value: function getLikes() {
            console.log('getLikes()');
            var objectId = '1661490050536739';
            _fb2.default.api("/" + objectId + "/", function (response) {
                console.log('response: ', response.error ? response.error : response);
                return response.error ? response.error : response;
            });
        }
    }]);

    return FBConn;
}();

module.exports = new FBConn();