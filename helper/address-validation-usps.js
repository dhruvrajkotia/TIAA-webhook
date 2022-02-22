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

const axios = require('axios');
const xml2js = require('xml2js');
require('dotenv').config();


const addressValidationUSPS = async () => {
    // console.log(process.env.USER_ID)
    let xmlRequest = `<AddressValidateRequest USERID="${process.env.USER_ID}"><Address>
    <Address1></Address1>
    <Address2>3501 Jupiter Rd</Address2>
    <City></City>
    <State></State>
    <Zip5>75082</Zip5>
    <Zip4></Zip4>
    </Address>
    </AddressValidateRequest>`;

    let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${xmlRequest}`;
    
    let config = {
        headers : { 'Content-Type': 'text/xml', 'Accept' : '*/*'}
    };

    let result = await axios.post(url, xmlRequest, config);
    // console.log(result.data);

    xml2js.parseString(result.data, (err, res) => {
        if (err) {
            console.log(err);
        }
        let jsonResult = JSON.stringify(res);

        console.log(jsonResult);
    })
}

addressValidationUSPS();
// module.exports = addressValidationUSPS;
