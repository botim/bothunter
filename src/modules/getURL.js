
import puppeteer from 'puppeteer';
import {cookie, userAgent} from '../../conf/conf';

const blockedResourceTypes = [
    'image',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
];

const skippedResources = [
    'quantserve',
    'adzerk',
    'doubleclick',
    'adition',
    'exelator',
    'sharethrough',
    'cdn.api.twitter',
    'google-analytics',
    'googletagmanager',
    'google',
    'fontawesome',
    'facebook',
    'analytics',
    'optimizely',
    'clicktale',
    'mixpanel',
    'zedo',
    'clicksor',
    'tiqcdn',
];

const proxy = 'http://191.102.91.122:80';

// settings

const baseurl = 'http://m.facebook.com/';
const puppeteerConf = {
    // args: [ '--proxy-server=5.160.219.86:8080' ],
    args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        '--disable-setuid-sandbox=true',
        '--window-size=1920x1080',
        '--disable-accelerated-2d-canvas=true'
        // , `--proxy-server=` + proxy,
    ],
    headless: true
};

module.exports = {
    loadURL: async function (url) {
        const fullurl = baseurl + url;
        const browser = await puppeteer.launch(puppeteerConf);

        const page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(userAgent);

        try {

            // add header for the navigation requests
            page.on('request', request => {
                // ignore unneeded requests
                if (
                    blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
                    skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
                ){
                    request.abort();
                    return;
                }

                // Do nothing in case of non-navigation requests.
                if (!request.isNavigationRequest()) {
                    request.continue();
                    return;
                }
                // Add a new header for navigation request.
                const headers = request.headers();
                headers['Access-Control-Allow-Origin'] = '*';

                headers['Cookie'] = cookie;

                request.continue({headers});
            });

            // navigate to the website
            const response = await page.goto(fullurl, {
                timeout: 30000,
                waitUntil: 'networkidle2',
            });

            if (response._status < 400) {
                // await page.waitFor('#m_more_friends a');

                console.log('Loading page: ', fullurl);
                // await page.waitForNavigation( { waitUntil : 'networkidle2' } );
                await page.waitFor(1000);
                const html = await page.content();
                await browser.close();

                return html;
            }
        } catch (err) {
            console.error(err);
            throw new Error('page.goto/waitForSelector timed out.');
        }

    }

};



/*
*         let options = {
            url: fullurl,
            agent: false,
            //timeout: 50000,
            headers: {
                'User-Agent': userAgent,
                'Upgrade-Insecure-Requests': 1,
                'Cookie': cookie
            }
        };

        */


//chrome mobile: 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36';
// MC desktop firefox:  'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0';
