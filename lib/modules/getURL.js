'use strict';

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _conf = require('../../conf/conf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// settings
var baseurl = 'http://m.facebook.com/';
var puppeteerConf = {
    // args: [ '--proxy-server=5.160.219.86:8080' ],
    args: ['--no-sandbox'],
    headless: true
};

module.exports = {
    loadURL: async function loadURL(url) {
        var fullurl = baseurl + url;
        var browser = await _puppeteer2.default.launch(puppeteerConf);

        var page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(_conf.userAgent);

        try {

            // add header for the navigation requests
            page.on('request', function (request) {
                // ignore image requests
                if (request.resourceType() === 'image') {
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
                timeout: 25000,
                waitUntil: 'domcontentloaded'
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