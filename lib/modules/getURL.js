'use strict';

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _conf = require('../../conf/conf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blockedResourceTypes = ['image', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];

var skippedResources = ['quantserve', 'adzerk', 'doubleclick', 'adition', 'exelator', 'sharethrough', 'cdn.api.twitter', 'google-analytics', 'googletagmanager', 'google', 'fontawesome', 'analytics', 'optimizely', 'clicktale', 'mixpanel', 'zedo', 'clicksor', 'tiqcdn'];

var proxy = 'http://104.236.214.59:80';

// settings

var baseurl = 'https://m.facebook.com/';
var puppeteerConf = {
    args: ['--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu', '--no-first-run', '--disable-setuid-sandbox=true', '--window-size=1920x1080', '--disable-accelerated-2d-canvas=true'
    // , `--proxy-server=` + proxy
    ],
    headless: true
};

module.exports = {
    init: async function init() {
        return this.loadURL('');
    },
    loadURL: async function loadURL(url) {
        var fullurl = baseurl + url;
        var browser = await _puppeteer2.default.launch(puppeteerConf);

        var page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(_conf.userAgent);

        try {
            // add header for the navigation requests
            page.on('request', function (request) {
                var requestUrl = request._url.split('?')[0].split('#')[0];
                // ignore unneeded requests
                if (blockedResourceTypes.indexOf(request.resourceType()) !== -1 || skippedResources.some(function (resource) {
                    return requestUrl.indexOf(resource) !== -1;
                })) {
                    request.abort();
                    return;
                }

                // Do nothing in case of non-navigation requests.
                if (!request.isNavigationRequest()) {
                    request.continue();
                    return;
                }
                // Add a new header for navigation request.
                var headers = request.headers();
                headers['Access-Control-Allow-Origin'] = '*';
                headers['Cookie'] = _conf.cookie;
                request.continue({ headers: headers });
            });

            // navigate to the website
            var response = await page.goto(fullurl, {
                timeout: 35000,
                waitUntil: 'networkidle2'
            });

            if (response._status < 400) {
                // await page.waitFor('#m_more_friends a');

                console.log('Loading page: ', fullurl);
                // await page.waitForNavigation( { waitUntil : 'networkidle2' } );
                await page.waitFor(1000);
                var html = await page.content();
                await browser.close();

                return html;
            }
        } catch (err) {
            console.error(err);
            return { err: 'error loading:' + err };
            // throw new Error('error loading:' + err);
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