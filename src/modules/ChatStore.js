import ChatService from '../Services/ChatService.js'

export default {
    state: {
    },
    mutations: {
    },
    getters: {
    },
    actions: {
        async addChat(context, { newChat }) {
            try {
                return await ChatService.add(newChat)
            } catch (err) {
                throw err;
            }
        },
        async getChat(context, { id }) {
            try {
                return await ChatService.getChat(id)
            } catch (err) {
                throw err;
            }
        }
    },
}