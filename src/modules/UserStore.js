import AuthService from '../Services/AuthService.js'
import UserService from '../Services/UserService.js'

export default {
    state: {
        users: [],
        loggedInUser: AuthService.getLoggedInUser(),
        pendings: [],
        members: [],
        loginModal: false
    },
    mutations: {
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        setPendings(state, { pendings }) {
            state.pendings = pendings;
        },
        setMembers(state, { members }) {
            state.members = members;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        updateUser(state, { user }) {
            const idx = state.users.findIndex(currUser => currUser._id === user._id)
            state.users.splice(idx, 1, user)
            if (state.loggedInUser && state.loggedInUser._id === user._id) state.loggedInUser = user;
        },
        toggleLogin(state) {
            state.loginModal = !state.loginModal;
        }
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        pendings(state) {
            return state.pendings;
        },
        members(state) {
            return state.members;
        },
        loginModal(state) {
            return state.loginModal;
        },
    },
    actions: {
        async login(context, { user }) {
            try {
                const loggedInUser = await AuthService.login(user)
                context.commit({ type: 'setLoggedInUser', user: loggedInUser })
                await context.dispatch({ type: 'createRoom', loggedInUser })
            } catch (err) {
                throw err;
            }
        },
        async signup(context, { userCredential }) {
            try {
                const loggedInUser = await AuthService.signup(userCredential)
                context.commit({ type: 'setLoggedInUser', user: loggedInUser })
                await context.dispatch({ type: 'createRoom', loggedInUser })
            } catch (err) {
                throw err;
            }
        },
        async logout(context) {
            await AuthService.logout()
            context.commit({ type: 'setLoggedInUser', user: null })
        },
        async getUserById(context, { id }) {
            try {
                return await UserService.getById(id)
            } catch (err) {
                throw err
            }
        },
        async updateUser(context, { user }) {
            try {
                const updatedUser = await UserService.save(user)
                context.commit({ type: 'updateUser', user: updatedUser })
                return updatedUser;
            } catch (err) {
                throw err;
            }
        },
        async getUsers(context) {
            const users = await UserService.query()
            context.commit({ type: 'setUsers', users })
        },
        async removeTripFromUser(context, { trip, user }) {
            const idx = user.memberIn.findIndex(
                currTrip => currTrip.tripId === trip._id
            );
            user.memberIn.splice(idx, 1);
            try {
                await context.dispatch({ type: 'updateUser', user })
            } catch (err) {
                throw err;
            }
        },
        async cancelRequesInUser(context, { trip, user }) {
            const idx = user.pendingIn.findIndex(
                currTrip => currTrip.tripId === trip._id
            );
            user.pendingIn.splice(idx, 1);
            try {
                await context.dispatch({ type: 'updateUser', user })
            } catch (err) {
                throw err;
            }
        }
    }
}