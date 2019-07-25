import SocketService from '../Services/SocketService.js'

export default {
    state: {
        msgs: [],
        typingMsg: null
    },
    mutations: {
        setTyping(state, { typingMsg }) {
            state.typingMsg = typingMsg
        }
    },
    getters: {
        typingMsg(state) {
            return state.typingMsg
        }
    },
    actions: {
        chatJoin(context, { chat, user }) {
            SocketService.on('chat newMsg', async msg => {
                chat.msgs.push(msg)
            });
            SocketService.on('chat typing', typingMsg => {
                context.commit({ type: 'setTyping', typingMsg })
            });
            SocketService.emit('chatJoin', { chat, user })
        },
        sendMsg(context, { chat, user, msg }) {
            SocketService.emit('chat msg', { chat, user, msg })
        },
        sendTyping(context, { chat, user }) {
            SocketService.emit('user typing', { chat, user })
        },
        stopTyping(context, { chat, user }) {
            SocketService.emit('stop typing', { chat, user })
        },
        createRoom(context, {loggedInUser}){
            SocketService.emit('create room', { loggedInUser })
        },
        joinTrip(context, {user, trip, owner}){
            SocketService.emit('join trip', { user, trip, owner })
        },
        async addChat(context, { newChat }) {
            try {
                return await SocketService.add(newChat)
            } catch (err) {
                throw err;
            }
        },
        async getChat(context, { id }) {
            try {
                return await SocketService.getChat(id)
            } catch (err) {
                throw err;
            }
        }

    }
}