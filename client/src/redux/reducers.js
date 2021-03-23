import { combineReducers } from "redux";
import { LOGIN, LOGOUT, ADD_USER, REMOVE_USER, NEW_MESSAGE } from "./constants";

const initial = {
  app: {
    username: null,
  },
  users: {},
  messages: {
    list: [],
    entities: {},
  },
};

const appReducer = (state = initial.app, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.username,
      };
    case LOGOUT:
      return {
        ...state,
        username: null,
      };
    default:
      return state;
  }
};

const usersReducer = (state = initial.users, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        [action.username]: true,
      };
    case REMOVE_USER:
      const newState = { ...state };
      delete newState[action.username];
      return newState;
    default:
      return state;
  }
};

const messagesReducer = (state = initial.messages, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return {
        ...state,
        list: [...state.list, action.message.id],
        entities: { ...state.entities, [action.message.id]: action.message },
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer,
  users: usersReducer,
  messages: messagesReducer,
});
