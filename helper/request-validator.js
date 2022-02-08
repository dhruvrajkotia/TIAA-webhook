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

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const ValidationError = require("./validation-error");
const validateV2Request = ajv.compile(require("./schemas/v2-request.json"));
const validateV3Request = ajv.compile(require("./schemas/v3-request.json"));

const v2RequestValidator = () => {
    return async (req, res, next) => {
        try {
            if(!validateV2Request(req.body))
                throw new ValidationError(validateV2Request.errors);
            next();
        } catch (error) {
            res.status(400).send(error);
        }
    };
};

const v3RequestValidator = () => {
    return async (req, res, next) => {
        try {
            if(!validateV3Request(req.body))
                throw new ValidationError(validateV3Request.errors);
            next();
        } catch (error) {
            res.status(400).send(error);
        }
    };
};

module.exports = {
    v2RequestValidator,
    v3RequestValidator
};