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

const webhookfulfillment = require("../../lib/dialogflow-fulfillment-builder-v3");
const config = require("./../../config")();
const exampleLogic = require("./logic/example-logic");

/**
 * Default tag controller
 * @param {object} df webhook fulfillment object
 */

const example = (services) => {
    return async (req, res, next) => {
        try {
            let fulfillment = new webhookfulfillment(config.fullfillmentConfigV3, req.body);
            await exampleLogic(fulfillment, services);
            res.status(200).send(fulfillment.getCompiledResponse());
        } catch (error) {
            next(error);
        }
    };
};

module.exports = example;
