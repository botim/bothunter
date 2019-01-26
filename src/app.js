"use strict";

import getURL from './modules/getURL'
import Parser from './modules/Parser';

// Unmark below, to use FB samples
// import FBConn from './modules/FBConn';



const testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '10156096314337076',
    user: 'peter.huwel',  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID:'550385403'
};

async function getData(initUrl, functionName){

    let info = {
        list: [],
        total: 0,
        nextItemsUrl: ''
    };


    await getURL.loadURL(initUrl).then((data) => {
        if (data) {
            const tmp = Parser[functionName](data);
            tmp.list.forEach((item) => console.log(item));

            info.list = [...info.list, ...tmp.list];
            info.nextItemsUrl = tmp.nextItemsUrl;
            if (tmp.total){
                info.total = tmp.total;
            }

            if (info.nextItemsUrl){
               getData(null, info.nextItemsUrl);
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

    async function getUsersFromID(postId, fullUrl) {
        const url = (postId) ? "browse/likes/?id=" + postId : fullUrl;
        getData(url, 'getUserLikesFromPost');
    }


    async function getUserFrinds(userName, fullUrl){
        const url = (userName) ? userName + '/friends' : fullUrl;
        getData(url, 'getFriendsListFromUser');

    }

    async function testPageLoad(url){
        await getURL.loadURL(url)
            .then((data) => {
            return data;
        })
    }


    // getUsersFromID(testData.user); // <<< Need fix

     getUsersFromID(null, testData.video);
    // testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

    // FB API samples
    // FBConn.getLikes(testData.itemID);
    // FBConn.getUser(testData.userID);
}


setTimeout(() => App(), 3000);






