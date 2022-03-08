"use strict"

const axios = require("axios");
const config = require("./../config")();


const addressValidation = async (query) => {
    try {

        // addressQueryExample = "730 Third Ave., New York, NY 10017"
        // query = "1001 N 11th St 72956"
        let params = {
            key: config.places.apiKey,
            query
        }
        let result = await axios.get(`${config.places.host}${config.places.endpoint}`, {
            params: params
        })
        console.log(params)
        console.log(result.data.results);


        return result.data.results   //array will contain the valid address, it will be empty if no valid address is found

    } catch (error) {
        console.log(error.message);
        return []
    }

}

module.exports = addressValidation;