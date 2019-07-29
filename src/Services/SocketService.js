import io from 'socket.io-client';
import store from '../store'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3000'
const socket = io(BASE_URL);

export default {
    on,
    emit,
}



socket.on('new request', (msg, trip, user) => {
    store.commit({type:'addRequest', msg})
    // store.commit({type:'update', trip})
    // store.commit({type:'updateUser', user})
})

function on(trigger, cb) {
    socket.on(trigger, cb)
}

function emit(trigger, data) {
    socket.emit(trigger, data)
}
