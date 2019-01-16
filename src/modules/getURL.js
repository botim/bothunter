// let getfile = require('./modules/getfile')
// let parsebody = require('../modules/parsebody');


let request = require('request');

// settings
let baseurl = 'http://m.facebook.com/';

module.exports = {
	loadURL: function (url) {
		let fullurl = baseurl + url;
		let options = {
			url: fullurl,
			agent: false,
			//timeout: 50000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36',
				'Upgrade-Insecure-Requests': 1,
				'Cookie': 'fr=0KgX4GMptclnHZ9qh.AWV0dX2f30k9_H1aQe1L2GP9xKE.Bax3uv.RT.Fw8.0.0.BcP7WB.AWXVxiku; sb=_J8CW4AQlTIzFC8dv0vndc0s; datr=_J8CW6NvLHqAPlgT8HSFslLj; c_user=100000913008569; xs=19%3ALRZbkGRGwty5Cg%3A2%3A1526898806%3A20786%3A15166; act=1547594911305%2F17; wd=1296x644; dpr=2; presence=EDvF3EtimeF1547594591EuserFA21B00913008569A2EstateFDt3F_5b_5dEutc3F1541075385853G547594591587CEchFDp_5f1B00913008569F2CC'
			}
		};

		function callback(error, response, body) {
			if (error) {
				if (response && response.statusCode != 200) {
					console.log('response.statusCode: ', response.statusCode);
				}

				if (error.code = 'ESOCKETTIMEDOUT') {
					console.log('error: ESOCKETTIMEDOUT ', data.count);
					//callback(error, response, body);
				} else if ( error.indexOf('socket hang up') >- 1 ){
					console.log('socket hang up', data.count);
					callback(error, response, body);
				} else {
					console.log('error in request: ', error);
					return false
				};
			} else {
				if (response && response.headers['last-modified']) {
					console.log('last modified: ', response.headers['last-modified']);
					data.datemodified = response.headers['last-modified'];
				} else {
					data.datemodified = '';
				}
				if (body && body != undefined) {
					// parsebody.getbody(body, data);
					return true;
				}
			}
		}

		request(options, callback);
	}

};
