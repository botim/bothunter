
import puppeteer from 'puppeteer';

// settings
const baseurl = 'http://m.facebook.com/';

const cookie = 'fr=0KgX4GMptclnHZ9qh.AWV0dX2f30k9_H1aQe1L2GP9xKE.Bax3uv.RT.Fw8.0.0.BcP7WB.AWXVxiku; sb=_J8CW4AQlTIzFC8dv0vndc0s; datr=_J8CW6NvLHqAPlgT8HSFslLj; c_user=100000913008569; xs=19%3ALRZbkGRGwty5Cg%3A2%3A1526898806%3A20786%3A15166; act=1547594911305%2F17; wd=1296x644; dpr=2; presence=EDvF3EtimeF1547594591EuserFA21B00913008569A2EstateFDt3F_5b_5dEutc3F1541075385853G547594591587CEchFDp_5f1B00913008569F2CC';

const userAgent = 'Googlebot/2.1 (+http://www.google.com/bot.html)';

module.exports = {
    loadURL: async function (url) {
        let fullurl = baseurl + url;

        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        await page.setUserAgent(userAgent);

        try {

            // add header for the navigation requests
            page.on('request', request => {
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
                const headers = request.headers();
                headers['Access-Control-Allow-Origin'] = '*';

                headers['Cookie'] = cookie

                request.continue({headers});
            });

            // navigate to the website
            const response = await page.goto(fullurl, {
                timeout: 25000,
                waitUntil: 'domcontentloaded',
            });

            if (response._status < 400) {
                // await page.waitFor('#m_more_friends a');

                // await page.waitForNavigation( { waitUntil : 'networkidle0' } );

                console.log('Loading page');
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
