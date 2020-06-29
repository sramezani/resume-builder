/**
 * API Config
 *
 * */

export default {

    // The URL we're connecting to
    // hostname: 'http://localhost:3007',
    hostname: 'https://api.wtfresume.com',
    imgurHostname: 'https://api.imgur.com/3/image',

    endpoints: [
        { key: 'save'               , url: '/save'          , method: 'POST'     },
        { key: 'download'           , url: '/download'      , method: 'GET'     },
        { key: 'download'           , url: '/download'      , method: 'POST'     },
    ],

};
