import {LOGIN, LOGOUT, ADD_USER, REMOVE_USER, NEW_MESSAGE, SEND_MESSAGE} from './constants'

export const login = (username) => ({
    type: LOGIN,
    username
})

export const logout = (username) => ({
    type: LOGOUT,
    username
})

export const addUser = (username) => ({
    type: ADD_USER, 
    username
})

export const removeUser = (username) => ({
    type: REMOVE_USER, 
    username
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    message
})

export const newMessage = (message) => ({
    type: NEW_MESSAGE,
    message
})