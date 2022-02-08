"use strict";

const { Firestore } = require("@google-cloud/firestore");


const connectionTest = async (firestore) => {
    const connection = await firestore.collection("tests").where("name", "==", "Test123").limit(2).get();
    if (!connection.empty) {
        connection.forEach(element => {
            console.log(element.data());
        });
    }
    return;
};

module.exports = async () => {
    const firestore = new Firestore();
    await connectionTest(firestore);
    return firestore;
};
