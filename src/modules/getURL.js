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
    'analytics',
    'optimizely',
    'clicktale',
    'mixpanel',
    'zedo',
    'clicksor',
    'tiqcdn',
];

const proxy = 'http://104.236.214.59:80';

// settings

const baseurl = 'https://m.facebook.com/';
const puppeteerConf = {
    args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        '--disable-setuid-sandbox=true',
        '--window-size=1920x1080',
        '--disable-accelerated-2d-canvas=true'
        // , `--proxy-server=` + proxy
    ],
    headless: true
};


class getUrl {

    async init() {
        console.log('init...');
        this.cookie = cookie;
        const test = await this.loadURL('');
        if (test && typeof test === 'string' && test.indexOf('<') === 0) {
            console.log('Init connection test passed...');
        } else {
            console.log('Init Test Fail:', (test.err) ? test.err : test);
        }
    }

    setcookie(str) {
        if (str) {
            this.cookie = str;
        }
    }

    async loadURL(url) {

        const fullurl = baseurl + url;
        const browser = await puppeteer.launch(puppeteerConf);

        const page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(userAgent);

        try {
            // add header for the navigation requests
            page.on('request', request => {
                const requestUrl = request._url.split('?')[0].split('#')[0];
                // ignore unneeded requests
                if (
                    blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
                    skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
                ) {
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
                headers['Cookie'] = this.cookie;
                request.continue({headers});
            });

            // navigate to the website
            const response = await page.goto(fullurl, {
                timeout: 25000,
                waitUntil: 'networkidle0',
            });

            if (response._status < 400) {
                await page.waitFor(1000);
                const html = await page.content();
                await browser.close();

                return html;
            }
        } catch (err) {
            console.error(err);
            return {err: 'error loading:' + err};
            // throw new Error('error loading:' + err);
        }

    }
};


module.exports = new getUrl();
