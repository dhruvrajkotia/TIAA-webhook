"use strict";

const { Firestore } = require("@google-cloud/firestore");


const connectionTest = async (firestore) => {
    const document = await firestore.doc('tests/intro');
    await document.set({"name": "Test123"});
    
    // const connection = await firestore.collection.where("name", "==", "Test123").limit(2).get();
    // if (!connection.empty) {
    //     connection.forEach(element => {
    //         console.log(element.data());
    //     });
    // }
    return;
};

module.exports = async () => {
    const firestore = new Firestore();
    await connectionTest(firestore);
    return firestore;
};
