import {
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
  GET_CONTACTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    case ADD_CONTACT:
      return {
        ...state,           
        contacts: [action.payload, ...state.contacts ],
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,           
        contacts: state.contacts.filter(contact => contact._id !== action.payload),
        loading: false
      }
    case CLEAR_CONTACTS:
      return {
        ...state,      
        contacts:null,     
        filtered: null,
        error: null,
        current:null
      }
    case SET_CURRENT:
    return {
      ...state,           
      current: action.payload
    }
    case CLEAR_CURRENT:
    return {
      ...state,           
      current: null
    }
    case UPDATE_CONTACT:
      return {
        ...state,           
        contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
        loading: false
      }
    case FILTER_CONTACTS:
      return {
        ...state,           
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`,'gi')
          return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex)
        }),
        loading: false
      }
    case CLEAR_FILTER:
      return {
        ...state,           
        filter: null
      }
    default:
      return state
  }
}