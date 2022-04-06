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
 
 const GetCityFromZipCode = async (df) => {
    let params;
    if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
        params = df._request.sessionInfo.parameters;
    };
    const zipCode = params['zip-code'];
    let city = params['location'] ? params['location']['city'] ? params['location']['city'] : "" : "";
    let streetAddress = ''
    let user_address = {};
    let formattedAddress;
    user_address['country'] = params['country']
    user_address['zip-code'] = zipCode
 
    const apiResponse = await addressValidation(params['country'] + " " + zipCode);
    if(apiResponse.length > 0) {
        formattedAddress = apiResponse[0].formatted_address.split(',');
        user_address['city'] = city ? city : formattedAddress.slice(-3)[0];
        let stateZipcode = formattedAddress.slice(-2)[0].split(' ')
        user_address['state'] = states[stateZipcode[1]] ? states[stateZipcode[1]] : stateZipcode[1];
    }

    const regex = /^\d+[a-zA-Z0-9_]*|^(\d+)/g;
    if (params['po-box'] != false && params['po-box'] != "false" && params['po-box'] != null)
    {
        streetAddress = params['po-box'];      
    }
    else {
        streetAddress = params['location']['street-address'] ? params['location']['street-address'] : params['street-address']['street-address'];
    }
    const foundUnitNum = streetAddress.match(regex);
    if (foundUnitNum)
        user_address['unit-number'] = foundUnitNum[0];
    user_address['street-address'] = streetAddress
    
    df.setParameter('user-address', user_address)
};
 module.exports = GetCityFromZipCode;
 