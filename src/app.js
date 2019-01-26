"use strict";

console.log('starting');
// let FBConn = require('./modules/FBConn.js');

import getURL from './modules/getURL'
import Parser from './modules/Parser';


const testURL = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '10156096314337076',
    user: 'peter.huwel'  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
};


async function App() {
    console.log('Loading...');




    async function getUserLikesFromPost(postId, fullUrl) {
        const url = (postId) ? "browse/likes/?id=" + postId : fullUrl;

        await getURL.loadURL(url).then((data) => {

            if (data) {
                const users = Parser.getUserLikesFromPost(data);
                users.list.forEach((u) => console.log(u.name));
                if (users.nextItemsUrl){
                    getUserLikesFromPost(null, users.nextItemsUrl);
                } else {
                    console.log('End of like list');
                }
            } else {
                console.log('No Data');
            }
        });
    }

    async function getUsersFromComments(postId, fullUrl) {
        const url = (postId) ? "browse/likes/?id=" + postId : fullUrl;

        await getURL.loadURL(url).then((data) => {

            if (data) {
                const users = Parser.getUserLikesFromPost(data);
                users.list.forEach((u) => console.log(u.name));
                if (users.nextItemsUrl){
                    getUserLikesFromPost(null, users.nextItemsUrl);
                } else {
                    console.log('End of like list');
                }
            } else {
                console.log('No Data');
            }
        });
    }


    async function getUserFrinds(userName, fullUrl){
        const url = (userName) ? userName + '/friends' : fullUrl;
        await getURL.loadURL(url).then(data => {

            if (data){
                const friends = Parser.getFriendsListFromUser(data);

                console.log('friends list', friends.list.length);
                console.log('totalFriends: ', friends.total);

                friends.list.forEach((f) => console.log(f.name));

                if (friends.nextItemsUrl){
                    getUserFrinds(friends.nextItemsUrl);
                } else {
                    console.log('End of friends list');
                }
            }
            if (!data){
                console.log('No DATA');
            }

        })
    }

    async function testPageLoad(url){
        await getURL.loadURL(url)
            .then((data) => {
            return data;
        })
    }


    // getUserFrinds(testURL.user);
    // getUserLikesFromPost(null, testURL.video);
    testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

}


setTimeout(() => App(), 3000);






