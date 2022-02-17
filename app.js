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

const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
const databaseConnections = require("./lib/database");
const webhookController = require("./intent-library/webhook-controller");
const webhookControllerV3 = require("./handler-v3");
const HttpService = require("./lib/http");
const requestValidator = require("./helper/request-validator");
const errorHandler = require("./helper/error-handler");
const config = require("./config")();
const logger = require("./lib/logger");
const authMiddleware = require("./helper/basic-auth");
const helmet = require("helmet");
const path = require("path");
// const listFlows = require("./helper/api-v3/flows/list");

module.exports = async () => {
    if (process.env.NODE_ENV == null || process.env.NODE_ENV == "local") {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, "keys/service-account.json");
    }
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(errorHandler);

    let router = express.Router();

    router.get("/healthcheck", (req, res) => {
        res.status(200).json({ "message": "ok" });
    });
    let services = [];
    let connections = await databaseConnections();
    if (connections["types"].length == 0) {
        logger.log("info", `database: ${false}`, null);
    }
    else {
        services["database"] = connections["connection"];
        logger.log("info", `database: ${true}`, null);
        logger.log("info", `databaseType(s) : ${connections["types"]}`, null);
    }


    if (config.services.http.enable)
        services["http"] = new HttpService(config);



    if (config.fullfillmentConfig.enable)
        router.post("/v2beta1/webhook", requestValidator.v2RequestValidator(), webhookController(services));
    if (config.fullfillmentConfigV3.enable)
        router.use("/v3alpha1/webhook", requestValidator.v3RequestValidator(), webhookControllerV3(services));

    expressWinston.requestWhitelist.push("body");
    expressWinston.responseWhitelist.push("body");

    expressWinston.bodyBlacklist = config.logger.piiFields;

    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        metaField: "apiDetails",
        format: winston.format.combine(
            winston.format.json()
        )
    }));

    if (config.auth.enable) {
        app.use(authMiddleware);
    }

    app.use("/", router);

    app.use(errorHandler);

    return app;
};
