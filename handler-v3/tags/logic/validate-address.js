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
 const addressValidation = require('../../../helper/address-validation');
 const states = require('../../../helper/state-mapper');
 
 const AddressValidation = async (df, db) => {
     let params;
     if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
         params = df._request.sessionInfo.parameters;
     };
     let userAddress = params.location.original + ' ' + (params['geo-city'] ? params['geo-city'] : '') + ' ' + params['zip-code'];
     const apiResponse = await addressValidation(userAddress);
     let newAddress = {};
     let formattedAddress;
     let completeAddress;
     if (apiResponse.length > 0) {
         formattedAddress = apiResponse[0].formatted_address.split(',');
         if (apiResponse[0].types[0] == 'postal_code' || apiResponse[0].types[0] == 'locality') {
             newAddress['city'] = formattedAddress[0];
             newAddress['state'] = states[formattedAddress[1].split(' ')[1]];
             newAddress['zip-code'] = formattedAddress[1].split(' ')[2];
             completeAddress = false;
         } else if (apiResponse[0].types[0]) {
             newAddress['street-address'] = formattedAddress[0];
             newAddress['city'] = formattedAddress[1];
             newAddress['state'] = states[formattedAddress[2].split(' ')[1]];
             newAddress['zip-code'] = formattedAddress[2].split(' ')[2];
             completeAddress = true;
         } else {
             newAddress = null;
             // pass
         }
         df.setParameter('new-address', newAddress);
         df.setParameter('complete-address', completeAddress);
     } else {
         console.log('Error: Address not valid')
     }
 };
 
 module.exports = AddressValidation;
 
 
 