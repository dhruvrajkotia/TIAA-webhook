"use strict";

//fetch data from firestore db
const GetData = async(db) => {
    
    try {
        const document = db.database.firestore.doc("userDetails/iqdGfnYUWs8ptKxh5pk3");
        const userData = await document.get();
        return userData.data();
    
    } catch (error) {
        console.log(error);
        return
    }
    
}

//update data in the firestore db
const UpdateData = async(db, updatedDetails) => {
    
    try {
        const document = db.database.firestore.doc("userDetails/iqdGfnYUWs8ptKxh5pk3");
        const updatedData = document.update(updatedDetails);
        console.log("Details updated");
        return true
    } catch (error) {
        console.log(err);
        return false
    }
    
}


module.exports = { GetData, UpdateData };