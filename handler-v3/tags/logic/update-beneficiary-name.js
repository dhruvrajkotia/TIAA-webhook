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
 
 const { UpdateData, GetData } = require("./../../../helper/firestore-methods");

 function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

 const UpdateBeneficiaryName = async (df, db) =>{

  let params ;
    if (df._request && df._request.sessionInfo && df._request.sessionInfo.parameters) {
        params = df._request.sessionInfo.parameters;
    };


    let updateIndex = params['updateIndex']
    let name = titleCase(params['person']['name'])
    let beneficiaryObject = params['db-user-details']['beneficiary']

    beneficiaryObject[updateIndex-1].name = name

    let updateDataResponse = await UpdateData(db, {"beneficiary": beneficiaryObject})

  if(updateDataResponse){
        let userData = await GetData(db);
        df.setParameter('db-user-details', userData);
  }
 };
 
 module.exports = UpdateBeneficiaryName;
 

