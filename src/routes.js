import express from 'express';
import funcs from './modules/Funcs';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Not now, i\'m too busy');
});

router.get('/testPage', async (req, res) => {

    const url = (req.query.url) ? req.query.url : null;
    console.log('testPageLoad', 'name:', name, 'url:', url);

    try {
        const data = await funcs.testPageLoad(url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url ,' : ', e);
        const re = {
            err: e
        };
        res.send(re);
    }
});

// App routes
router.get('/getLikes', async (req, res) => {

    const id = (req.query.id) ? req.query.id : null;
    const url = (req.query.url) ? req.query.url : null;
    try {
        const data = await funcs.getLikesFromID(id, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url ,' : ', e);
        const re = {
            err: e
        };
        res.send(re);
    }
});

router.get('/getShares', async (req, res) => {

    const id = (req.query.id) ? req.query.id : null;
    const url = (req.query.url) ? req.query.url : null;;

    try {
        const data = await funcs.getSharesFromID(id, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url ,' : ', e);
        const re = {
            err: e
        };
        res.send(re);
    }
});

router.get('/getFrinds', async (req, res) => {

    const name = (req.query.name) ? req.query.name : null;
    const url = (req.query.url) ? req.query.url : null;

    try {
        const data = await funcs.getUserFrinds(name, url);
        res.send(data);
    } catch (e) {
        console.log('error loading ', url ,' : ', e);
        const re = {
            err: e
        };
        res.send(re);
    }
});




module.exports = router;
