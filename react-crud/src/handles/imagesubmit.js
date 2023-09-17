//Interacting w/ the images.

import { addDoc, collection } from "@firebase/firestore"
import firebase from "firebase/compat/app";
// Required for side-effects
import { firestore} from '../firebase';
 
const imageSubmit = (foodItem, expDate) => {
    console.log("submitted");
    const ref = collection(firestore, "imageData") // Firebase creates this automatically
 
    let data = {
        food: foodItem,
        expirationDate: expDate,
        //maybe add location here? Depends on how we choose to incorporate location
    }
    
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}
 
export default imageSubmit
