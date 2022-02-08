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

const webhookFullfillment = require("../../lib/dialogflow-fulfillment-builder-v3");
const config = require("../../config")();
const tagMapper = require("./tag-mapper");

/**
 * Dialogflow v3(cx) fullfillment controller
 * @param {object} req http request 
 * @param {object} res http response
 * @param {function} next invokes the succeeding middleware/function
 */

module.exports = (services) => {
    return async (req, res, next) => {
        try {
            const requestTag = req.body.fulfillmentInfo.tag;
            let fulfillment = new webhookFullfillment(config.fullfillmentConfigV3, req.body);
            const tag = await tagMapper(requestTag);
            if (tag)
                await tag(fulfillment, services);
            else {
                const requiredTag = getTags(requestTag);
                await require(requiredTag)(fulfillment, services);
            }
            let result = fulfillment.getCompiledResponse();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };
};

const getTags = (name) => {
    let file = name.toLowerCase();
    file = file.replace(/ +/g, "-");
    return `./logic/${file}`;
};