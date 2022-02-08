/**
 * Copyright 2020 Quantiphi, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";
const appConstants = require("./response-builder/constants");


class DialogflowFulfillmentV3 {
    /**
   * The object of this DialogflowFulfillment class can be used to call all the functions of this class
   * @param {Object} config config object which has the platformsEnabled array
   * @example 
   * {
   *     "platformsEnabled": [ "TEXT", "ACTIONS_ON_GOOGLE", "FACEBOOK_MESSENGER", "TELEPHONY" ]
   * } 
   * @param {Object} request Dialogflow Fulfillment request object
   */

    constructor(config, request) {
        if (config.platformsEnabled && config.platformsEnabled.length > 0) {
            config.platformsEnabled.forEach(platform => {
                if (appConstants.platformSupport.indexOf(platform) < 0) {
                    throw new Error(`platform - ${platform} not supported`);
                }
            });
            this._config = config;
            this._request = request;
            this._response = {
                sessionInfo: request.sessionInfo,
                fulfillmentResponse: {
                    messages:[]
                }
            };
            if(!this._response.sessionInfo.parameters)
                this._response.sessionInfo.parameters = {};
        } else {
            throw new Error("Malformed parameters");
        }
    }

    /**
    * setResponseText sets text response
    * @param {String} responseText the text to be set in the response (required)
    * @example
    * "Hello, welcome."
    */
    setResponseText(responseText) {
        if (this._config.platformsEnabled.indexOf("TEXT") >= 0) {
            this._response.fulfillmentResponse.messages.push({ "text": { "text": [responseText] } });
            this._response.fulfillmentText = responseText;
        } else {
            throw new Error("platform - TEXT is not enabled");
        }
    }

    setParameter(parameter, value){
        if (this._config.platformsEnabled.indexOf("TEXT") >= 0) {
            this._response.sessionInfo.parameters[parameter] = value;
        } else {
            throw new Error("platform - TEXT is not enabled");
        }
    }

    setPayload(payload) {
        this._response.fulfillmentResponse.messages.push({ "payload": payload });
    }

    /**
     * getCompiledResponse compiles the entire webhook response built and returns it
     * @returns {Object} Fulfillment Response sent to Dialogflow
     */
    getCompiledResponse() {
        return this._response;
    }

}

module.exports = DialogflowFulfillmentV3;