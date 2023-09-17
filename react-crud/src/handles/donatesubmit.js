import { addDoc, collection } from "@firebase/firestore"
import firebase from "firebase/compat/app";
// Required for side-effects
import { firestore} from '../firebase';
 
const foodSubmit = (foodItem, daysToExp) => {
    console.log("submitted");
    const ref = collection(firestore, "donations") // Firebase creates this automatically
 
    let data = {
        food: foodItem,
        daysTilExpire: daysToExp,
        //maybe add location here? Depends on how we choose to incorporate location
    }
    
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}
 
export default foodSubmit
