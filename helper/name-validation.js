const nlp = require('compromise');

/**
* To validate user name
* @param {Object} name name
* @returns {Number} if name is correct return name else set empty string
*/
const validateNameNLP = async (query) => {
    // check name with nlp library
    const names = nlp(query).people().out('topk');
    if (names.length > 0) {
        nerName = names[0].normal.split('').join(' ');
    } else {
        let name;
        try {
            name = await helper.filterName(query);
            nerName = name;
        } catch (error) {
            console.log('First Name not found after applying filter');
        }
    }
    return nerName;

}

const filterName = () => {
    const itReplace = data.replace(' it', ' i t ');
    const whyReplace = itReplace.replace('why', 'y');
    const doubleReplace = whyReplace.replace('double',
        whyReplace.substring(data.indexOf('double') + 7, whyReplace.indexOf('double') + 8));
    const wordArray = doubleReplace.split(' ');

    let name;
    wordArray.forEach((word) => {
        if (word.length < 2) {
            if (name) {
                name += word;
            } else {
                name = word;
            }
        }
    });
    if (name) {
        return name.split('').join(' ');
    }

    console.log('No name found from raw string');
    return null;



}
module.exports = validateNameNLP, filterName;