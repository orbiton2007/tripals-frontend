import NotificationsService from '../Services/NotificationsService'

export default {
    state: {
        room: null
    },
    mutations: {
        setRoom(state, { room }) {
            state.room = room;
        },
        addRequest(state, { msg }) {
            state.room.requests.unshift(msg)
        }
    },
    getters: {
        requests(state) {
            return state.room.requests
        }
    },
    actions: {
        async addRoom(context, { newRoom }) {
            try {
                return await NotificationsService.add(newRoom)
            } catch (err) {
                throw err;
            }
        },
        async getRoom(context, { id }) {
            try {
                const room = await NotificationsService.getRoom(id)
                context.commit({ type: 'setRoom', room })
                return room;
            } catch (err) {
                throw err;
            }
        }
    }
}