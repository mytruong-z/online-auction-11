import { ref, getDatabase, set,get, child } from "firebase/database"
import { v4 as uuidv4 } from 'uuid'

export const addNotificationData = (userID, content, type) => {
    
    const db = getDatabase()
    
    set(ref(db, `notification/${userID}/noti-item/${uuidv4()}`), {
        content,
        type
    });
    /// increment unread
    
    // read once
    const dbRef = ref(getDatabase());
    get(child(dbRef, `notification/${userID}/unRead`)).then((snapshot) => {
      if (snapshot.exists()) {
        let unRead = parseInt(snapshot.val());
        unRead++;
        set(ref(db, `notification/${userID}/unRead`), unRead);
      }
    }).catch((error) => {
      console.error(error);
    });
    // write
}

export const writeUnRead = (userId, amountUnRead) => {
    const db = getDatabase()
    set(ref(db, `notification/${userId}/unRead`), amountUnRead);
}