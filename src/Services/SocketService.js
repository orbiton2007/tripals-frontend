import HttpService from '../Services/HttpService'
import AuthService from './AuthService'
import io from 'socket.io-client';
import store from '../store'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000'
const socket = io(BASE_URL);

export default {
    on,
    emit,
    // getRequests,
    add,
    getChat,
    update
}

// var requests;
// var user = AuthService.getLoggedInUser()
// if (user) requests = user.notifications;
// else requests = []

// function getRequests() {
//     return requests;
// }

// _connectSocket()

// function _connectSocket() {

socket.on('new request', msg => {
    // requests.push(msg);
    // _setRequests(msg)
    // console.log('im in service front ', SocketStore);
    store.commit({ type: 'setRequests', msg })
})
// }

// function _setRequests(msg) {
//     SocketStore.commit({ type: 'setRequests', msg })
// }



function on(trigger, cb) {
    socket.on(trigger, cb)
}

// socket.on('chat typing',test=>{
//     console.log('got here from typing');

// })

function emit(trigger, data) {
    socket.emit(trigger, data)
}

function add(newChat) {

    return HttpService.post(_getUrl(), newChat)
}

function getChat(id) {
    return HttpService.get(_getUrl(id))
}

function update(chat) {
    return HttpService.put(_getUrl(chat._id), chat)
}

function _getUrl(id = '') {
    return `chat/${id}`
}
