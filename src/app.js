"use strict";

import funcs from './modules/Funcs';

import express from 'express';


const testData = {
    video: '/ufi/reaction/profile/browser/fetch/?limit=10&total_count=351&ft_ent_identifier=281112199228679',
    likesFullUrl: 'ufi/reaction/profile/browser/?ft_ent_identifier=2027002237395095',
    post: 'netanyahu/photos/a.10151681566507076/10156096314307076',
    likes: '2027002237395095',
    user: 'peter.huwel',  //'moshe.dzanashvili'  // 'michael.even.54' // MAYASR
    itemID: '366827403332071',
    userID: '550385403'
};


const app = express();
const port = 1984;


app.get('/getLikes', async (req, res) => {

    const id = (req.query.id) ? req.query.id : null;
    const url = (req.query.url) ? req.query.url : null;
    console.log('getLikes', 'id:', id, 'url:', url);

    try {
        const data = await funcs.getLikesFromID(id, url);
        res.send(data);
    } catch (e) {
        res.send(e);
    }
});

app.get('/getShares', async (req, res) => {

    const id = (req.query.id) ? req.query.id : null;
    const url = (req.query.url) ? req.query.url : null;
    console.log('getShares', 'id:', id, 'url:', url);

    try {
        const data = await funcs.getSharesFromID(id, url);
        res.send(data);
    } catch (e) {
        const re = {
            err: e
        };
        res.send(re);
    }
});

app.get('/getFrinds', async (req, res) => {

    const name = (req.query.name) ? req.query.name : null;
    const url = (req.query.url) ? req.query.url : null;
    console.log('getFrinds', 'name:', name, 'url:', url);

    try {
        const data = await funcs.getUserFrinds(name, url);
        res.send(data);
    } catch (e) {
        res.send(e);
    }
});


app.listen(port, () => console.log('Botator app listening on port ', port));


// getUserFrinds(testData.user);

// getLikesFromID(null, testData.likesFullUrl);
// getSharesFromID(testData.itemID);
// testPageLoad('/story.php?story_fbid=2622896591058463&id=366827403332071');

// FB API samples
// FBConn.getLikes(testData.itemID);
// FBConn.getUser(testData.userID);








