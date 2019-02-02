'use strict';

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    selectors: {
        userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a', ' div div div div div a:nth-child(1)'],
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
    getListByType: function getListByType(data, type) {
        var _this = this;

        var reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        var response = this.testSelector('total', data);
        reObj.total = response && response.length ? response.text().replace('All', '') : null;

        var tmp = this.testSelector(type, data);
        if (tmp && tmp.length) {
            tmp.each(function (i, e) {
                return reObj.list.push({
                    name: _this.getHrefText(e),
                    link: _this.stripUrl(e.attribs.href)
                });
            });
        }
        return reObj;
    },
    getHrefText: function getHrefText(e) {
        return e.children && e.children[0].children ? e.children[0].children[0].data : e.children[0].data;
    }
};