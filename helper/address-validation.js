"use strict"

const axios = require("axios");
const config = require("./../config")();


const addressValidation = async (addressQuery) => {             
    try {

    // addressQueryExample = "730 Third Ave., New York, NY 10017"
    let result = await axios.get(`${config.places.host}/${config.places.endpoint}`, {
        params: {
            key: config.places.apiKey,
            addressQuery
        }
    })

    console.log(result.data.results);
    
    return result.data.results   //array will contain the valid address, it will be empty if no valid address is found
     
    } catch (error) {
        console.log(error)
        return []
    }
    
}


module.exports = addressValidation