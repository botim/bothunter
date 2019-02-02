import cheerio from 'cheerio';

module.exports = {

    selectors: {
        userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a', ' div div div div div a:nth-child(1)'],
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

    getListByType(data, type) {
        const reObj = {
            list: [],
            total: 0,
            nextItemsUrl: ''
        };
        reObj.nextItemsUrl = this.getNextUrl(data);
        const response = this.testSelector('total', data);
        reObj.total = (response && response.length) ? response.text().replace('All', '') : null;

        const tmp = this.testSelector(type, data);
        if (tmp && tmp.length){
            tmp.each((i, e) => reObj.list.push(
                {
                    name: this.getHrefText(e),
                    link: this.stripUrl(e.attribs.href)
                }
            ));
        }
        return reObj;
    },

    getHrefText(e){
        return (e.children && e.children[0].children) ? e.children[0].children[0].data : e.children[0].data;
    }

};
