import React, {useReducer} from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
 ADD_CONTACT,
 DELETE_CONTACT,
 SET_CURRENT,
 CLEAR_CURRENT,
 UPDATE_CONTACT,
 FILTER_CONTACTS,
 CLEAR_FILTER,
 SET_ALERT,
 REMOVE_ALERT
} from '../types'

const ContactState = props => {
 const initialState = {
  contacts: [
   {
    id:1,
    name: 'Jill Johnson',
    email: 'jill@gmail.com',
    phone:'111-2-2-2-2',
    type:'personal'
   },
   {
    id:2,
    name: 'Jim Johnson',
    email: 'jim@gmail.com',
    phone:'111-53452',
    type:'personal'
   },
   {
    id:3,
    name: 'Jia Johnson',
    email: 'jia@gmail.com',
    phone:'111-53452-2',
    type:'proffesional'
   }
  ]
 }

 const [state, dispatch] = useReducer(contactReducer, initialState)

 // Add Contact
const addContact = contact => {
 contact.id = uuidv4()
 dispatch( {
   TYPE: ADD_CONTACT,
   payload: contact
 })
}


 // Delete contact

 // Set Current Contact

 // Clear Current Contact
 
 // Update Contact

 // Filter Contact

 // Clear Contact

 return (
  <ContactContext.Provider
   value={{
    contacts: state.contacts,
    addContact
   }}
  >
   {props.children}
  </ContactContext.Provider>
 )
}

export default ContactState