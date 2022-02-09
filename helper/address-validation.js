// Config object
// "places": {
//     "enable": true,
//     "apiKey": process.env.MAPS_API_KEY,
//     "host": "https://maps.googleapis.com/maps/api/place/",
//     "endpoint": "textsearch/json"
// }

"use strict"

const axios = require("axios");
const extractNumbers = require('extract-numbers');

const addressValidation = async (app, queryParams) => {
    //Check for all the entities(parameters) and append it in the query
    try {
    let query = "";
    let nmKeyWord = "New Mexico, United States"
    let useNmKeyWord = false;
    if (queryParams.placeName)
        query = query + " " + queryParams.placeName;
    if (queryParams.streetAddress)
        query = query + " " + queryParams.streetAddress;
    if (queryParams.city)
        query = query + " " + queryParams.city;
    else 
        useNmKeyWord = true;
    if (queryParams.zipcode)
        query = query + " " + queryParams.zipcode;
    else
        useNmKeyWord = true;
    if(useNmKeyWord)
        query = query + " ," + nmKeyWord
    let address = "";
    let result = await axios.get(`${app.config.places.host}${app.config.places.endpoint}`, {
        params: {
            key: app.config.places.apiKey,
            query
        }
    })
    app.logger.log("info",`Address Validation Results for Query: ${query}`, "places API", {queryParams,result});
    if (result.data && result.data.results && result.data.results.length > 0) {
        if(!result.data.results[0].formatted_address.includes(result.data.results[0].name))
             address = "<speak>Please confirm that the address is" +" "+ result.data.results[0].name
        else
            address = "<speak>Please confirm that the address is"
        address = address +  " "  + result.data.results[0].formatted_address + "</speak>";
        
        //extract the number(zipcode) from the address and say it as characters
        let numbersInAddress = extractNumbers(address);         
        numbersInAddress.forEach(num=>{
            address = address.replace(num, `<say-as interpret-as="characters">${num}</say-as>`)
        })
    }else if(result.data && result.data.status === "ZERO_RESULTS")
        address = "ZERO_RESULTS"

    return address
    } catch (error) {
        app.logger.log("error", "Address Validation failed", "places API", error.stack);
        return ""
    }
    
}

 module.exports = addressValidation