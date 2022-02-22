/**
 * Copyright 2020 Quantiphi Inc. All Rights Reserved.
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
 * Maps dialogflow v3 webhook calls with its controller based on tag
 */

"use strict";

const tags = (tag) => {
    const mappedTag = mapper[tag];
    if (mappedTag)
        return mappedTag;
    else
        return undefined;

};

const mapper = {
    "default-tag": require("./logic/default-tag"),
    "phone-number-validation": require("./logic/phone-number-validation"),
    "fetch-profile-details": require("./logic/fetch-profile-details"),
    "update-phone-number": require("./logic/update-phone-number"),
    "update-beneficiary-name": require("./logic/update-beneficiary-name"),
    "name-validation": require("./logic/name-validation"),
    "address-validation": require("./logic/address-validation"),
    "validate-address": require("./logic/validate-address"),
    "new-address-validation": require("./logic/new-address-validation"),
    "update-address": require("./logic/update-address"),
    "zip-code": require("./logic/zip-code"),
    "validate-house-number": require("./logic/validate-house-number")
};

module.exports = tags;


