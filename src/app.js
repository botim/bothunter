"use strict";

import express from 'express';
import getUrl from './modules/getURL';
import router from './routes';

// const timeout = require('connect-timeout');

const app = express();
const port = 1984;
const appKey = 'welvlmlsorh765cn9d723sa72ew0342';


app.use( (req, res, next) => {
    const authorised = (req.query.key && req.query.key === appKey);
    console.log('authorised:', authorised);
    next();
    // if (!authorised) {
    //     return res.status(403).send("Unauthorised!");
    // }
    // else {
    //     next();
    // }
});


app.use('/', router);

app.listen(port, () => console.log('Botator app listening on port ', port)).setTimeout(500000);


async function test(){
const test = await getUrl.init();
    if (test && typeof test === 'string' && test.indexOf('<') === 0){
        console.log('Init connection test passed...');
    } else {
        console.log('Init Test Fail:', (test.err) ? test.err : test);
    }
}
test();

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('Uncaught Exception: ', err)
});








// getUserFrinds(testData.user);

// getLikesFromID(null, testData.likesFullUrl);
// getSharesFromID(testData.itemID);
// testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

// FB API samples
// FBConn.getLikes(testData.itemID);
// FBConn.getUser(testData.userID);




/*
const testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    likesFullUrl: 'ufi/reaction/profile/browser/?ft_ent_identifier=2027002237395095',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '2027002237395095',
    user: 'peter.huwel',  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID: '550385403'
};
*/




