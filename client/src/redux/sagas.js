import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { fork, take, takeLatest, call, put, cancel, actionChannel } from "redux-saga/effects";
import { addUser, removeUser, newMessage } from "./actions";
import { SEND_MESSAGE, LOGIN, LOGOUT, NEW_MESSAGE } from "./constants";

function connect() {
  const socket = io("http://localhost:4000");
  return new Promise((resolve) => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel((emit) => {
    
    socket.on(LOGIN, (username) => {
      emit(addUser(username));
    });

    socket.on(LOGOUT, (username) => {
      emit(removeUser(username));
    });

    socket.on(NEW_MESSAGE, (message) => {
      emit(newMessage(message));
    });

    return () => {
      socket.close();
    };
  });
}


function* read(socket) {
  let SocketChannel;
  try{
    SocketChannel = yield call(subscribe, socket);
    while (true) {
      const action = yield take(SocketChannel);
      yield put(action);
    }
  } catch(err){
    console.log('Subscription terminated');
  } finally{
    SocketChannel.close()
  }
}


function* write(socket) {
  const channel = yield actionChannel(SEND_MESSAGE)
  while (true) {
    yield takeLatest(channel, function*({message}){
      yield socket.emit("message", message);
    });
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    const socket = yield call(connect);

    let { username } = yield take(LOGIN);
    socket.emit(LOGIN, username);

    const task = yield fork(handleIO, socket); 

    let {type} = yield take(LOGOUT);
    yield cancel(task);
    socket.emit(type);
  }
}

export function* rootSaga() {
  yield fork(flow);
}
