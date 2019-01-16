"use strict";

console.log('starting');
// let FBConn = require('./modules/FBConn.js');

import getURL from './modules/getURL'

const testURL = {
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: 'browse/likes/?id=10156096314337076',
    user: 'michael.even.54'
};


async function App() {
    // console.log('APP start: ', FBConn.getaccessToken());
    // if (FBConn.getaccessToken()) {
    //     FBConn.getLikes();
    // }
    console.log('Loading...');

    const re = await getURL.loadURL(testURL.user);

    console.log(re);

}


setTimeout(() => App(), 3000);






