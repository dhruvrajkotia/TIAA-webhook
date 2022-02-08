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
 * Maps dialogflow intent with its controller
 */

"use strict";

const actions = (action)=>{
    const mappedAction = mapper[action];
    if(mappedAction)
        return mappedAction;
    else 
        return undefined;

};

const mapper = {
    "default": require("./actions/default"),
};

module.exports = actions;


