"use strict";

const rp = require("request-promise");
const logger = require("../logger");

module.exports = class HttpService {
    constructor(){
        this._config = {};
    }

    init(config){
        this._config = config;
        return Promise.resolve();
    }

    get(uri, options){
        return this.request(Object.assign({uri,method: "GET"}, options));
    }

    post(uri, options, body){
        return this.request(Object.assign({uri,method: "POST"}, options), body);
    }

    async request(options, body){
        let rpOptions = Object.assign({timeout: 15000, simple: true}, options);
        try {
            if(rpOptions.method === "POST" || rpOptions.method === "PUT" || rpOptions === "PATCH")
                rpOptions.body = body;
            const response = await rp(rpOptions);
            logResponse(rpOptions, response);
            return response;
        } catch (error) {
            logResponse(rpOptions, error.response, error);
            throw error;
        }

    }

};

function logResponse(options, response, err) {
    let level = (err === undefined) ? "info" : "error";

    let payload = {
        options: cleanOptions(options)
    };

    if (response && response.headers) {
        response.responseHeaders = cleanHeaders(response.headers);
        payload.response = response;
    }

    if (err) {
        payload.error = cleanError(err);
    }

    logger.log(level, "HttpRequest",JSON.parse(JSON.stringify(payload)));
}

function cleanHeaders(headers) {
    let headersCopy = JSON.parse(JSON.stringify(headers));

    for (let name in headers) {
        let lowerName = name.toLowerCase();
        if (lowerName.includes("apikey") || lowerName === "authorization") {
            delete headersCopy[name];
        }
    }

    return headersCopy;
}

function cleanError(err) {
    let errCopy = JSON.parse(JSON.stringify(err));
    delete errCopy.options;
    delete errCopy.response;
    return errCopy;
}

function cleanOptions(options) {
    let optionsCopy = JSON.parse(JSON.stringify(options));
    delete optionsCopy.auth;
    delete optionsCopy.cert;
    delete optionsCopy.key;

    if (optionsCopy.headers) {
        optionsCopy.headers = cleanHeaders(optionsCopy.headers);
    }

    return optionsCopy;
}
