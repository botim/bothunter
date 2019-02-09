import getURL from './getURL';
import Parser from './Parser';
import logger from './log';

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';

const Iinfo = {
  list: [],
  total: 0,
  nextItemsUrl: '',
  page: '',
  err: '',
};

async function getData(initUrl, functionName, type, _info) {
  logger.info('Loading URL: ', { initUrl, functionName, type });
  const info = (_info) || Object.assign(Iinfo);

  await getURL.loadURL(initUrl).then(async (data) => {
    if (data && !data.err) {
      const tmp = await Parser[functionName](data, type);

      if (tmp.err) {
        info.err = tmp.err;
      }

      if (tmp.total) {
        info.total = tmp.total;
      }

      info.list = [...info.list, ...tmp.list];
      info.nextItemsUrl = tmp.nextItemsUrl;

      if (info.nextItemsUrl) {
        return await getData(info.nextItemsUrl, functionName, type, info);
      }
      logger.info('End of list');
    } else {
      const msg = (data && data.err) ? data.err : 'No Data';
      console.log(msg);
      info.page = data;
      info.err = msg;
    }
  });

  return info;
}


module.exports = {


  getLikesFromID: async (postId, fullUrl) => {
    const url = (postId) ? `ufi/reaction/profile/browser/?ft_ent_identifier=${postId}` : fullUrl;
    return getData(url, 'getListByType', 'userLikes');
  },


  getSharesFromID: async (postId, fullUrl) => {
    const url = (postId) ? `browse/shares/?id=${postId}` : fullUrl;
    return getData(url, 'getListByType', 'shares');
  },

  getUserFrinds: async (userName, fullUrl) => {
    logger.info('Fetching friend list', { userName });
    const url = (userName) ? `${userName}/friends` : fullUrl;
    return getData(url, 'getListByType', 'userFriends');
  },

  testPageLoad: async (url) => {
    await getURL.loadURL(url)
      .then(data => data);
  },

};
