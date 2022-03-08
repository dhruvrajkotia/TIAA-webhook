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
 
 //  const { UpdateData } = require("../../../helper/firestore-methods");
 const addressValidationUSPS = require('../../../helper/address-validation-usps');
 const states = require('../../../helper/state-mapper');
 
 const AddressValidationUsps = async (df, db) => {
     let params;
     let newAddress = {};
     if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
         params = df._request.sessionInfo.parameters;
     };

     let address = {
         zip_code: params['isvalid-zip-code'] ? params['zip-code'] : '',
         city: params['city'],
         state: params['state'],
         street: params['street-address']['street-address'],
         unitnumber: params['unitnumber']
     }
     
     const apiResponse = await addressValidationUSPS(address);

     if (apiResponse) {
        newAddress['street-address'] = apiResponse["Address2"][0];
        newAddress['city'] = apiResponse["City"][0];
        newAddress['state'] = states[apiResponse["State"][0]];
        newAddress['zip-code'] = apiResponse["Zip5"][0];
        newAddress['is-valid'] = true;
     }

     df.setParameter('new-address', newAddress);

 };
 
 module.exports = AddressValidationUsps;
 
 
 