import { USER, SELLER, ADMIN } from '../config'

export const selectRole = (roleID) => {
    if(roleID === 1) return USER
    else if(roleID === 2) return SELLER
    else return ADMIN
}
