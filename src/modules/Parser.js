import cheerio from 'cheerio';

module.exports = {

  selectors: {
    errors: ['div:nth-child(2) div div:nth-child(1) > span'],
    userLikes: ['._55wp a:first-child strong', ' div:nth-child(2) > a:nth-child(1) a', 'h3.be a', ' div div div div div a:nth-child(1)'],
    userFriends: [' td:nth-child(2) a', 'td:nth-child(2) a', 'li:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)'],
    total: ['div.t > a.u.v:nth-child(1)', 'div:nth-child(1) div:nth-child(2) div div:nth-child(1) > h3'],
    shares: ['div.v div.y a:nth-child(1)'],
    NextUrl: ['#m_more_friends a', 'table.i.j tr:nth-child(1) td div.e a'],
  },

  search: { NextUrl: ['See More'] },

  testSelector(selector, data) {
    const $ = cheerio.load(data); //  , {decodeEntities: false}
    let re = [];
    this.selectors[selector].forEach((sel) => {
      const list = $(sel);
      if (list && list.length > 0) {
        re = $(sel);
      }
    });

    if (!re || !re.length) {
      $('span').filter(r => $(data).text().trim().indexOf(this.search[selector]) > -1).parent();
    }

    return re;
  },

  getNextUrl(data) {
    const re = this.testSelector('NextUrl', data);
    return (re && re.length) ? re.attr('href') : null;
  },

  stripUrl(str) {
    const delimiter = (str.indexOf('profile.php?') > -1) ? '&' : '?';
    return (str.indexOf(delimiter)) ? str.substr(0, str.indexOf(delimiter)) : str;
  },


  getListByType(data, type) {
    const reObj = {
      list: [],
      total: 0,
      nextItemsUrl: '',
      err: '',
    };

    const err = this.testSelector('errors', data);
    if (err && err.length) {
      let errStr;
      err.each((i, er) => {
        errStr = (er.children && er.children[0]) ? reObj.err + er.children[0].data : reObj.err + er;
      });
      if (errStr.indexOf('error') > -1) {
        reObj.err = errStr;
        return reObj;
      }
    }

    reObj.nextItemsUrl = this.getNextUrl(data);
    const total = this.testSelector('total', data);

    reObj.total = (total && total.length) ? total.text().replace(/\D/g, '') : null;

    const tmp = this.testSelector(type, data);
    if (tmp && tmp.length) {
      tmp.each((i, e) => reObj.list.push(
        {
          name: this.getHrefText(e),
          link: this.stripUrl(e.attribs.href),
        },
      ));
    }
    return reObj;
  },

  getHrefText(e) {
    return (e.children && e.children[0].children) ? e.children[0].children[0].data : e.children[0].data;
  },

};
