import HttpService from '../Services/HttpService'
import io from 'socket.io-client';
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000'
const socket = io(BASE_URL);

export default {
    on,
    emit,
    add,
    getChat,
    update
}

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
