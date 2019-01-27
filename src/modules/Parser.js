import cheerio from 'cheerio';

// var linkifyStr = require('linkifyjs/string');


module.exports = {

    selectors: {
        userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a'],
        userFriends: [' td.v.s:nth-child(2) a.ce', ' td.v.s:nth-child(2) a.bn'],
        total: ['div.t > a.u.v:nth-child(1)', 'h3.ca.i'],
        shares: ['div.v div.y a:nth-child(1)'],
        NextUrl: ['#m_more_friends a', 'table.i.j tr:nth-child(1) td div.e a']
    },

    testSelector(selector, data){
        const $ = cheerio.load(data); //  , {decodeEntities: false}
        let re =[];
        this.selectors[selector].forEach(sel => {
            const list = $(sel);
            if (list && list.length > 0){
                re = $(sel);
            }
        });

        return re;
    },

    getNextUrl(data) {
        const re = this.testSelector('NextUrl', data);
        return (re && re.length) ? re.attr('href') : null;
    },

    stripUrl(str){
        const delimiter = (str.indexOf('profile.php?') > -1) ? '&' : '?';
        return (str.indexOf(delimiter)) ? str.substr(0, str.indexOf(delimiter)) : str;
    },

    getUserLikesFromPost(data) {
        const reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        const response = this.testSelector('total', data);
        reObj.total = (response && response.length) ? response.text().replace('All', '') : null;

        const likes = this.testSelector('userLikes', data);
        if (likes && likes.length){
            likes.each((i, e) => reObj.list.push(
                {
                    name: e.children[0].data,
                    link: this.stripUrl(e.attribs.href)
                }
            ));
        }

        return reObj;
    },

    getUserSharesFromPost(data) {
        const reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        const response = this.testSelector('total', data);
        reObj.total = (response && response.length) ? response.text().replace('All', '') : null;

        const shares = this.testSelector('shares', data);
        if (shares && shares.length){
            shares.each((i, e) => reObj.list.push(
                {
                    name: e.children[0].children[0].data,
                    link: this.stripUrl(e.attribs.href)
                }
            ));
        }

        return reObj;
    },

    getFriendsListFromUser(data) {
        const reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };

        const $ = cheerio.load(data); //  , {decodeEntities: false}

        reObj.total = $(this.selectors.total).text().replace('Friends (', '').replace(')', '');

        reObj.nextItemsUrl = this.getNextUrl(data);

        let list = testSelector('userFriends', data);

        if (list){
        list.each((i, e) => reObj.list.push({
                name: $(e).text(),
                link: this.stripUrl($(e).attr('href'))
            }
        ));}

        return reObj;
    }

};
