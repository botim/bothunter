'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    selectors: {
        errors: ['div:nth-child(2) div div:nth-child(1) > span'],
        userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a', ' div div div div div a:nth-child(1)'],
        userFriends: [' td:nth-child(2) a', 'td:nth-child(2) a', 'li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)'],
        total: ['div.t > a.u.v:nth-child(1)', 'div:nth-child(1) div:nth-child(2) div div:nth-child(1) > h3'],
        shares: ['div.v div.y a:nth-child(1)'],
        NextUrl: ['#m_more_friends a', 'table.i.j tr:nth-child(1) td div.e a']
    },

    search: {
        NextUrl: ['See More']
    },

    testSelector: function testSelector(selector, data) {
        var _this = this;

        var $ = _cheerio2.default.load(data); //  , {decodeEntities: false}
        var re = [];
        this.selectors[selector].forEach(function (sel) {
            var list = $(sel);
            if (list && list.length > 0) {
                re = $(sel);
            }
        });

        if (!re || !re.length) {
            $('span').filter(function (r) {
                return $(data).text().trim().indexOf(_this.search[selector]) > -1;
            }).parent();
        }

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
    getListByType: function getListByType(data, type) {
        var _this2 = this;

        var reObj = {
            list: [],
            total: 0,
            nextItemsUrl: '',
            err: ''
        };

        var err = this.testSelector('errors', data);
        if (err && err.length) {
            var errStr = void 0;
            err.each(function (i, er) {
                errStr = er.children && er.children[0] ? reObj.err + er.children[0].data : reObj.err + er;
            });
            if (errStr.indexOf('error') > -1) {
                reObj.err = errStr;
                return reObj;
            }
        }

        reObj.nextItemsUrl = this.getNextUrl(data);
        var total = this.testSelector('total', data);

        reObj.total = total && total.length ? total.text().replace(/\D/g, '') : null;

        var tmp = this.testSelector(type, data);
        if (tmp && tmp.length) {
            tmp.each(function (i, e) {
                return reObj.list.push({
                    name: _this2.getHrefText(e),
                    link: _this2.stripUrl(e.attribs.href)
                });
            });
        }
        return reObj;
    },
    getHrefText: function getHrefText(e) {
        return e.children && e.children[0].children ? e.children[0].children[0].data : e.children[0].data;
    }
};