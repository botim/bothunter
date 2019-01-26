import FB from 'fb';

/*
* Register an app with facebook developers to get access
* https://developers.facebook.com/
*
* Add your access credentials here:
* */
const cred = {
    id: "YOUR APP ID GOES HERE", // '306004383378464', //
    secret: 'YOIUR APP SECERET GOES HERE'   // '490ac572bea1fe90678e889cbe342594' , //
};


class FBConn {
    /*
    * Get access token on init
    * */

    constructor() {
        FB.api('oauth/access_token', {
            client_id: cred.id,
            client_secret: cred.secret,
            grant_type: 'client_credentials'
        }, (res) => {
            this.access_token = (!res || res.error) ? null : res.access_token;
        });
    }

    /*
    Trying to get likes Etc. from a public page (if you aren't the owner) requires special approval from Facebook:

       (#10) To use 'Page Public Content Access', your use of this endpoint must be reviewed and approved by Facebook.
       To submit this 'Page Public Content Access' feature for review  -
       please read our documentation on reviewable features: https://developers.facebook.com/docs/apps/review.

    **/
    getLikes(str) {
        if (this.access_token) {
            FB.api(
                "/" + str + "/?access_token=" + this.access_token,
                (response) => {
                    console.log('response: ', (response.error) ? response.error : response)
                    return (response.error) ? response.error : response;
                }
            );
        } else {
            console.log('No Token');
        }

    }


/*
*
* User data request will return:
* {
  "message": "Unsupported get request. Object with ID 'XXXX' does not exist,
  cannot be loaded due to missing permissions, or does not support this operation.
  Please read the Graph API documentation at https://developers.facebook.com/docs/graph-api",
  "type": "GraphMethodException"
}
* */
    getUser(userId) {
        if (this.access_token) {
            FB.api(
                "/" + userId + "/?access_token=" + this.access_token,
                (response) => {
                    console.log('response: ', (response.error) ? response.error : response)
                    return (response.error) ? response.error : response;
                }
            );
        } else {
            console.log('No Token');
        }

    }
}

module.exports = new FBConn();


