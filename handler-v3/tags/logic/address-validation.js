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
 const addressValidationUSPS = require('../../../helper/address-validation-usps');
 
 const NewAddressValidation = async (df, db) => {
     let params;
     if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
         params = df._request.sessionInfo.parameters;
     };
     let formattedAddress;
     let zipCode = params['user-address']['zip-code'];
     let address = {};

     address["unit-number"] = params['user-address']['unit-number'] ? params['user-address']['unit-number'] : params['unit-number']
     address["country"] = params["country"]
     address["zip-code"] = params['user-address']['zip-code']
     address["city"] = params['user-address']['city'] ? params['user-address']['city'] : params['city']
     address["state"] = params['user-address']['state'] ? params['user-address']['state'] : ""
     address["is_address_valid"] = false


     if (params['po-box'] != false && params['po-box'] != "false" && params['po-box'] != null) {
         const apiResponse = await addressValidationUSPS({ 'poBox': params['po-box'], 'zipCode': params['user-address']['zip-code'] });
         country = params['country']
         address["street-address"] = params['po-box']
         if (apiResponse['Address2']) {
             zip_code = apiResponse.Zip5[0];
             if (zipCode.toLowerCase() === zip_code.toLowerCase()) {
                 address["is-valid"] = true
             }
         }
     } else {
         let userAddress = (params['user-address']['unit-number'] ? "" : params['unit-number']) + ' ' + params['user-address']['street-address'] + ' ' + params['user-address']['zip-code']
         let zipCode = params['user-address']['zip-code']
         address["street-address"] = (params['user-address']['unit-number'] ? "" : params['unit-number']) + ' ' + params['user-address']['street-address']
         const apiResponse = await addressValidation(userAddress);
         if (apiResponse.length > 0) {
            formattedAddress = apiResponse[0].formatted_address.split(',');
            let stateZipcode = formattedAddress.slice(-2)[0].split(' ')
            let zip_code = stateZipcode.slice(2,10).join(' ');
            if (zipCode.toLowerCase() === zip_code.toLowerCase()){
                address["is-valid"] = true
            }
        }
     }
     df.setParameter('address', address)
 };
 
 module.exports = NewAddressValidation;
