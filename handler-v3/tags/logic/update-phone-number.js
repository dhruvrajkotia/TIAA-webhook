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

const { logger } = require("express-winston");
 /**
  * Default tag controller
  * @param {object} df webhook fulfillment object
  */
 
 const { UpdateData } = require("./../../../helper/firestore-methods");

 const UpdatePhoneNumber = async (df, db) =>{

  let params ;
    if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
        params = df._request.sessionInfo.parameters;
    };

  let updatedPhoneNumber = params["phonenumber"]["phone-number"]
  
  let updateDataResponse = await UpdateData(db, {"phoneNumber": updatedPhoneNumber})

  if(updateDataResponse){
    df.setResponseText(`We have successfully updated your contact details.`);
    
  }
    
 };
 
 module.exports = UpdatePhoneNumber;
 

