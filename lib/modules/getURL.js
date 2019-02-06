'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _conf = require('../../conf/conf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var blockedResourceTypes = ['image', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];

var skippedResources = ['quantserve', 'adzerk', 'doubleclick', 'adition', 'exelator', 'sharethrough', 'cdn.api.twitter', 'google-analytics', 'googletagmanager', 'google', 'fontawesome', 'analytics', 'optimizely', 'clicktale', 'mixpanel', 'zedo', 'clicksor', 'tiqcdn'];

var proxy = 'socks5://127.0.0.1:9050';

// settings

var baseurl = 'https://m.facebook.com/';
var puppeteerConf = {
    args: ['--proxy-server=' + proxy, '--ignore-certificate-errors', '--disable-setuid-sandbox', '--no-sandbox', '--disable-gpu', '--no-first-run', '--disable-setuid-sandbox=true', '--window-size=1920x1080', '--disable-accelerated-2d-canvas=true'],
    headless: true
};

var getUrl = function () {
    function getUrl() {
        _classCallCheck(this, getUrl);
    }

    _createClass(getUrl, [{
        key: 'init',
        value: async function init() {
            console.log('init...');
            this.cookie = _conf.cookie;
            var test = await this.loadURL('');
            if (test && typeof test === 'string' && test.indexOf('<') === 0) {
                console.log('Init connection test passed...');
            } else {
                console.log('Init Test Fail:', test.err ? test.err : test);
            }
        }
    }, {
        key: 'setcookie',
        value: function setcookie(str) {
            if (str) {
                this.cookie = str;
            }
        }
    }, {
        key: 'loadURL',
        value: async function loadURL(url) {
            var _this = this;

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
                    headers['Cookie'] = _this.cookie;
                    request.continue({ headers: headers });
                });

                // navigate to the website
                var response = await page.goto(fullurl, {
                    timeout: 25000,
                    waitUntil: 'networkidle0'
                });

                if (response._status < 400) {
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
    }]);

    return getUrl;
}();

;

module.exports = new getUrl();