import SocketService from '../Services/SocketService.js'

export default {
    state: {
        msgs: [],
        // chat: { msgs: [] },
        typingMsg: null
    },
    mutations: {
        setTyping(state, { typingMsg }) {
            // console.log('msg typing mutations 11', typingMsg);

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
                console.log('typing... 36 actions');
                context.commit({ type: 'setTyping', typingMsg })
            });
            SocketService.emit('chatJoin', { chat, user })
        },
        sendMsg(context, { chat, user, msg }) {
            SocketService.emit('chat msg', { chat, user, msg })
        },
        sendTyping(context, { chat, user }) {
            SocketService.emit('user typing', { chat, user})
        },
        stopTyping(context, {chat, user}){
            SocketService.emit('stop typing', { chat, user})
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