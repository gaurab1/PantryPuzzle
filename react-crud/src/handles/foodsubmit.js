import { addDoc, collection } from "@firebase/firestore"
import firebase from "firebase/compat/app";
// Required for side-effects
import { firestore} from '../firebase';
// import { firestore } from "../firebase_setup/firebase"
 
const foodSubmit = (testdata) => {
    const ref = collection(firestore, "test_data") // Firebase creates this automatically
 
    let data = {
        testData: testdata
    }
    
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}
 
export default foodSubmit
