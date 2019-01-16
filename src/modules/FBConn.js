

import FB from 'fb';

const cred = {
    id: "306004383378464",
    secret: "490ac572bea1fe90678e889cbe342594"
};



class FBConn {

    constructor(){
        FB.api('oauth/access_token', {
            client_id: cred.id,
            client_secret: cred.secret,
            grant_type: 'client_credentials'
        }, (res) => {
            this.access_token = (!res || res.error) ? null : res.access_token;
        });
    }

    getaccessToken(){
        return this.access_token;
    }

    getLikes(){
        console.log('getLikes()');
        const objectId = '1661490050536739';
        FB.api(
            "/"+ objectId +"/",
            (response) => {
                    console.log('response: ', (response.error) ? response.error : response)
                    return (response.error) ? response.error : response;
            }
        );
    }
}

module.exports = new FBConn();


