import { ref, getDatabase, set } from "firebase/database"
import { v4 as uuidv4 } from 'uuid'

export const addNotificationData = (userID, content, type) => {
    const db = getDatabase()
   
    set(ref(db, `notification/${userID}/${uuidv4()}`), {
        content,
        type
    });
    
}