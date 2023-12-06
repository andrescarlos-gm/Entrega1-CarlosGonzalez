import {getFirestore, doc, getDoc} from "firebase/firestore"


const db = getFirestore();

export async function insert(title, iduser)


    const refDoc = doc(db,"parallaxhumanoid","XkfDXoNeA9rF8xo5LaxN")
    
    getDoc(refDoc).then((snapshot)=>{
       console.log(snapshot.data())
    })