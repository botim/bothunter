"use strict";

import getURL from './modules/getURL'
import Parser from './modules/Parser';

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';



const testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    likesFullUrl:'ufi/reaction/profile/browser/?ft_ent_identifier=2027002237395095',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '2027002237395095',
    user: 'peter.huwel',  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID:'550385403'
};

async function getData(initUrl, functionName, type){

    let info = {
        list: [],
        total: 0,
        nextItemsUrl: ''
    };


    await getURL.loadURL(initUrl).then((data) => {
        console.log('loading: ', initUrl);

        if (data) {
            const tmp = Parser[functionName](data, type);
            tmp.list.forEach((item) => console.log(item));

            info.list = [...info.list, ...tmp.list];
            info.nextItemsUrl = tmp.nextItemsUrl;
            if (tmp.total){
                info.total = tmp.total;
            }

            if (info.nextItemsUrl){
               getData(info.nextItemsUrl, functionName, type);
            } else {
                console.log('End of list');
            }
        } else {
            console.log('No Data');
        }
    });
    return info;
}


async function App() {
    console.log('Loading...');

    /*
    * Sample functions to loop through some data types
    * */

    async function getLikesFromID(postId, fullUrl) {
        const url = (postId) ? "browse/likes/?id=" + postId : fullUrl;
        getData(url, 'getListByType', 'userLikes');
    }


    async function getSharesFromID(postId, fullUrl) {
        const url = (postId) ? "browse/shares/?id=" + postId : fullUrl;
        getData(url, 'getListByType', 'shares');
    }


    async function getUserFrinds(userName, fullUrl){
        const url = (userName) ? userName + '/friends' : fullUrl;
        getData(url, 'getListByType', 'userFriends');

    }

    async function testPageLoad(url){
        await getURL.loadURL(url)
            .then((data) => {
            return data;
        })
    }


    // getUserFrinds(testData.user);

    getLikesFromID(null, testData.likesFullUrl);
    // getSharesFromID(testData.itemID);
    // testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

    // FB API samples
    // FBConn.getLikes(testData.itemID);
    // FBConn.getUser(testData.userID);
}

setTimeout(() => App(), 3000);






