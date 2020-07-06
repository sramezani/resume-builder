// Consts and Libs
import { Labels, APIConfig } from '../constant';

// Config
// const HOSTNAME = APIConfig.hostname;
const requestCounter = 0; // Number each API request (used for debugging)

/**
 * Convert param object into query string
 * eg.
 *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
 *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
 */
function serialize(obj, prefix) {
    const str = [];

    Object.keys(obj).forEach((p) => {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];

        if (p.match(/AwesomeBeautyArray/)) {
            str.push(v);
        } else {
            str.push(
                v !== null && typeof v === 'object'
                    ? serialize(v, k)
                    : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
            );
        }
    });

    return str.join('&');
}

/**
 * Sends requests to the API
 */
function fetcher(
    method,
    inputEndpoint,
    inputParams,
    body,
    token,
    endpointKey,
    thirdParty = false
) {
    const HOSTNAME = thirdParty ? '' : APIConfig.hostname;

    let endpoint = inputEndpoint;
    const params = inputParams;

    return new Promise((resolve, reject) => {
        // After x seconds, let's call it a day!
        const timeoutAfter = 45;
        const apiTimedOut = setTimeout(
            () => reject(Labels.error.timeOut),
            timeoutAfter * 1000
        );

        if (!method || !endpoint) {
            return reject('Missing params (API.fetcher).');
        }

        // Build request
        const req = {
            method: method.toUpperCase(),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization-Token': token,
                // 'X-Auth-Token': `${AppConfig.loginToken}`
            },
        };

        // Add Endpoint Params
        let urlParams = '';
        if (params) {
            // Object - eg. /recipes?title=this&cat=2
            if (typeof params === 'object') {
                // Replace matching params in API routes eg. /recipes/{param}/foo
                Object.keys(params).forEach((param) => {
                    if (endpoint.includes(`{${param}}`)) {
                        endpoint = endpoint
                            .split(`{${param}}`)
                            .join(params[param]);
                        delete params[param];
                    }
                });

                // Check if there's still an 'id' prop, /{id}?
                if (params.id !== undefined) {
                    if (
                        typeof params.id === 'string' ||
                        typeof params.id === 'number'
                    ) {
                        urlParams = `/${params.id}`;
                        delete params.id;
                    }
                }
                // Add the rest of the params as a query string
                urlParams = `?${serialize(params)}`;
            } else if (
                typeof params === 'string' ||
                typeof params === 'number'
            ) {
                // String or Number - eg. /recipes/23
                urlParams = `/${params}`;
            } else {
                // Something else? Just log an error
                console.log('oooops');
            }
        }

        // Add Body
        if (body) {
            req.body = body;
        }

        const thisUrl = HOSTNAME + endpoint + urlParams;
        // Make the request
        return (
            fetch(thisUrl, req)
                .then(async (rawResponse) => {
                    // API got back to us, clear the timeout
                    clearTimeout(apiTimedOut);

                    /**skipping 401 as well to handle it inside app and show the message */
                    if (
                        !rawResponse ||
                        (rawResponse.status !== 200 &&
                            rawResponse.status !== 401)
                    ) {
                        throw JSON.parse(rawResponse._bodyInit);
                        // throw rawResponse ? rawResponse._bodyInit : { message: Labels.error.networkError };
                    }

                    let jsonResponse = {};
                    try {
                        jsonResponse = await rawResponse.json();
                    } catch (error) {
                        let err = '';
                        if (!rawResponse.url.includes(HOSTNAME)) {
                            err = { message: Labels.error.networkError };
                        } else {
                            err = { message: Labels.error.default };
                        }
                        throw err;
                    }
                    return jsonResponse;
                })
                .then((response) => {
                    return resolve(response);
                })
                // when response status code is not 200
                .catch(async (error, code) => {
                    // API got back to us, clear the timeout
                    clearTimeout(apiTimedOut);

                    // if (error === 401) {
                    // 	return reject(error);
                    // }

                    // if (!error.message) {
                    // 	return reject(Labels.error.default);
                    // }
                    return reject(error);
                })
        );
    });
}

/* Create the API Export ==================================================================== */
/**
 * Build services from Endpoints
 * - So we can call AppAPI.recipes.get() for example
 */
const AppAPI = {
    // getToken: Token.getToken,
    // tokenIsValid: Token.tokenIsValid
};

APIConfig.endpoints.forEach((endpoint) => {
    AppAPI[endpoint.key] = (params, body, token) =>
        fetcher(
            endpoint.method,
            endpoint.url,
            params,
            body,
            token,
            endpoint.key,
            endpoint.thirdParty
        );
});

/* Export ==================================================================== */
export default AppAPI;
