"use strict";

import express from 'express';
import getUrl from './modules/getURL';

import router from './routes';

const app = express();
const port = 1984;
const appKey = 'welvlmlsorh765cn9d723sa72ew0342';


app.use((req, res, next) => {

    if (req.query.cookie) {
        const cookie = req.query.cookie;
        getUrl.setcookie(cookie);
    }

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

getUrl.init();

process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log('Uncaught Exception: ', err)
});




