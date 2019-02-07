# Facebook screper


### Dev nots

start:
npm i

build:
npm run build

Run:
(node) node lib/app
(pm2) pm2 lib/app.js

#### Connections

src/getUrl.js

> const baseurl

set base address for scrapper. https://m.facebook.com recomanded, https://facebookcorewwwi.onion if using Tor.

> const proxy

set proxy address if using. Note that ports needs to be open in server.

> const useProxy

Enable/disable proxy usage

#### Using Tor

If using tor as proxy, install tor on the server/dev env by instructions:

linux:
https://www.torproject.org/docs/tor-doc-unix.html.en

OSX/MacOS:
https://www.torproject.org/docs/tor-doc-osx.html.en


#### Selectors

scraping data is done by selectors.

src/parser -
Add/edit selectors:
> selectors

Add/edit search strings (for text search):
> search

each selector type can have multiple selector options to be scrapped.
1st selector that returnes data - will be returned.

#### analyze selectors
> /PageSamples

Page samples from returned data, to be used to analyze selectors and responses.

--------------------


### Requests

get your cookie by:
 - log to facebook with your account
 - open network in developr tools
 - find any HTML resource call
 - find it's request headers
 - copy the "Cookie" header

add your cookie at the end of every call, as in the sample:

https://serveraddress/endpoint?param=param&coockie=YourFacebookCookie

#### Current end point

 - getLikes param: id / full url (everything after the domain name)
 - getShares param: id / full url (everything after the domain name)
 - getFrinds param: name / id

for load testing:
 - testPage param: (everything after the domain name)


sample request:
http://localhost:1984/getFrinds?name=bibi.netanyaho&cookie=fr=0kjkn887nHZ9qh.AWVUuzTatNKAV-2AHMaAa-yr7R0.Bax3uv.RT.AAA.0.0.BcWTvP.AWUM7xIU;%20sb=_J8CWsdsdsdslTIzFC8dv0vndc0s;%20datr=_J8CW6NvLHqAPlgT8HSFslLj;%20wd=1440x712;%kmkmkmk;%20xs=9%3AR_m5q%3A2%3A1549351887%3A20786%3A15166;%20pl=n

