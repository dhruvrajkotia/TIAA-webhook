const PhoneNumber = require('awesome-phonenumber');
 
/**
* To validate user phone number
* @param {Object} phoneNumber Phone number
* @returns {Number} if number is correct return number else set empty string
*/
const validatePhoneNumber = (phoneNumber, countryCode = 'US') => {
   // pass country code and number
   var number = new PhoneNumber(phoneNumber, countryCode);
   return number.isValid()
}

module.exports = validatePhoneNumber;