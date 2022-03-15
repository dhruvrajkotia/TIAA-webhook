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
 
 const CheckPoBox = async (df) => {
     console.log(df._request.text);
     const userQuery = df._request.text;
     const poBoxRegex = /(po|post office|postal|post|mailing|mail) box \d{1,4}/gi;
     const poBoxFound = userQuery.match(poBoxRegex);
     if (poBoxFound) {
         const poBoxNumberRegex = /\d{1,4}/gi;
         const poBoxNumber = (poBoxFound[0].match(poBoxNumberRegex))[0];
         df.setParameter("po-box", `PO Box ${poBoxNumber}`);
     } else {
         df.setParameter("po-box", false);
     }
     // const zip4Regex = /\d{1,4}$/gi
     // const zip4Found = userQuery.match(zip4Regex);
     // console.log(zip4Found);
 };
 
 module.exports = CheckPoBox;