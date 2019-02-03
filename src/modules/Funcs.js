import getURL from "./getURL";
import Parser from "./Parser";

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';

const Iinfo = {
    list: [],
    total: 0,
    nextItemsUrl: '',
    page:'',
    err: ''
};

async function getData(initUrl, functionName, type, _info) {

    let info = (_info) ? _info : Iinfo;

    console.log('loading URL: ', initUrl);
    await getURL.loadURL(initUrl).then(async (data) => {

        if (data) {
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
            } else {
                console.log('End of list');
            }
        } else {
            console.log('No Data');
            info.page = data;
            info.err = 'No Data found';
        }
    });

    return info;
};



module.exports = {


    getLikesFromID: async (postId, fullUrl) => {
        const url = (postId) ? "ufi/reaction/profile/browser/?ft_ent_identifier=" + postId : fullUrl;
        return getData(url, 'getListByType', 'userLikes');
    },


    getSharesFromID: async (postId, fullUrl) => {
        const url = (postId) ? "browse/shares/?id=" + postId : fullUrl;
        return getData(url, 'getListByType', 'shares');
    },

    getUserFrinds: async (userName, fullUrl) => {
        const url = (userName) ? userName + '/friends' : fullUrl;
        return getData(url, 'getListByType', 'userFriends');
    },

    testPageLoad: async (url) => {
        await getURL.loadURL(url)
            .then((data) => {
                return data;
            })
    }

};
