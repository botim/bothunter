'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var linkifyStr = require('linkifyjs/string');


module.exports = {

    selectors: {
        userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a'],
        userFriends: [' td.v.s:nth-child(2) a.ce', ' td.v.s:nth-child(2) a.bn'],
        total: ['div.t > a.u.v:nth-child(1)', 'h3.ca.i'],
        shares: ['div.v div.y a:nth-child(1)'],
        NextUrl: ['#m_more_friends a', 'table.i.j tr:nth-child(1) td div.e a']
    },

    testSelector: function testSelector(selector, data) {
        var $ = _cheerio2.default.load(data); //  , {decodeEntities: false}
        var re = [];
        this.selectors[selector].forEach(function (sel) {
            var list = $(sel);
            if (list && list.length > 0) {
                re = $(sel);
            }
        });

        return re;
    },
    getNextUrl: function getNextUrl(data) {
        var re = this.testSelector('NextUrl', data);
        return re && re.length ? re.attr('href') : null;
    },
    stripUrl: function stripUrl(str) {
        var delimiter = str.indexOf('profile.php?') > -1 ? '&' : '?';
        return str.indexOf(delimiter) ? str.substr(0, str.indexOf(delimiter)) : str;
    },
    getUserLikesFromPost: function getUserLikesFromPost(data) {
        var _this = this;

        var reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        var response = this.testSelector('total', data);
        reObj.total = response && response.length ? response.text().replace('All', '') : null;

        var likes = this.testSelector('userLikes', data);
        if (likes && likes.length) {
            likes.each(function (i, e) {
                return reObj.list.push({
                    name: e.children[0].data,
                    link: _this.stripUrl(e.attribs.href)
                });
            });
        }

        return reObj;
    },
    getUserSharesFromPost: function getUserSharesFromPost(data) {
        var _this2 = this;

        var reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        var response = this.testSelector('total', data);
        reObj.total = response && response.length ? response.text().replace('All', '') : null;

        var shares = this.testSelector('shares', data);
        if (shares && shares.length) {
            shares.each(function (i, e) {
                return reObj.list.push({
                    name: e.children[0].children[0].data,
                    link: _this2.stripUrl(e.attribs.href)
                });
            });
        }

        return reObj;
    },
    getFriendsListFromUser: function getFriendsListFromUser(data) {
        var _this3 = this;

        var reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };

        var $ = _cheerio2.default.load(data); //  , {decodeEntities: false}

        reObj.total = $(this.selectors.total).text().replace('Friends (', '').replace(')', '');

        reObj.nextItemsUrl = this.getNextUrl(data);

        var list = testSelector('userFriends', data);

        if (list) {
            list.each(function (i, e) {
                return reObj.list.push({
                    name: $(e).text(),
                    link: _this3.stripUrl($(e).attr('href'))
                });
            });
        }

        return reObj;
    }
};
