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

/**
 * Default tag controller
 * @param {object} df webhook fulfillment object
 */
const addressValidation = require('../../../helper/address-validation');
const states = require('../../../helper/state-mapper');

const ZipCode = async (df) => {
    let params;
    if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
        params = df._request.sessionInfo.parameters;
    };
    const zipCode = params['zip-code'];
    let city = ""
    let state = ""
    let formattedAddress;
    let isValid = false;
    if (zipCode.length == 5) {

        isValid = true;

        if (params['getCityCountry']) {
        const apiResponse = await addressValidation(zipCode);
            if(apiResponse.length > 0) {
                formattedAddress = apiResponse[0].formatted_address.split(',');
                if (formattedAddress.length == 3) {
                    city = formattedAddress[0];
                    state = states[formattedAddress[1].split(' ')[1]];
                } else {
                    city = formattedAddress[1];
                    state = states[formattedAddress[2].split(' ')[1]]
                }
            }

            df.setParameter('city', city)
            df.setParameter('state', state)
        }
    }
        
    df.setParameter("isvalid-zip-code", isValid);
};

module.exports = ZipCode;
