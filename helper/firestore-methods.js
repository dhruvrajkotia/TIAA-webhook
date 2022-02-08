"use strict";

//fetch data from firestore db
const GetData = (db, docId = '') => {
    db.firestore.collection("userDetails").doc(docId).get().then((res) => {
        console.log(res.data());
        return res.data();
    }).catch((err) => {
        console.log(err);
        return;
    });
}

//update data in the firestore db
const UpdateData = (db, updatedDetails, docId = '') => {
    db.firestore.collection("userDetails").doc(docId).update(updatedDetails).then(() => {
        console.log("Document updated");
        return true
    }).catch((err) => {
        console.log(err);
        return false
    })
}

exports.module = { GetData, UpdateData };