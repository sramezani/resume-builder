/**
 * API Config
 *
 * */

export default {
    // The URL we're connecting to
    hostname: 'http://localhost:3000',
    // hostname: 'https://api.wtfresume.com',
    imgurHostname: 'https://api.imgur.com/3/image',

    endpoints: [
        { key: 'save', url: '/api/save', method: 'POST' },
        { key: 'download', url: '/api/download', method: 'GET' },
        { key: 'download', url: '/api/download', method: 'POST' },
    ],
};
