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

const HouseNumberValidation = async (df) => {
    let params;
    
    if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
        params = df._request.sessionInfo.parameters;
    };

    let unitNumber = params["house-number"];
    let regex = /\d+[a-zA-Z]{0,3}/g;
    unitNumber = unitNumber.match(regex);

    df.setParameter('unit-number', unitNumber[0]);
}

// HouseNumberValidation();

module.exports = HouseNumberValidation;