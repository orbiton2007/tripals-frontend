import TripService from '../Services/TripService.js'
import LoggerService from '../Services/LoggerService.js'


export default {
    state: {
        trips: [],
        ownerTrips: [],
        tripsUserShared: [],
        tripsUserPendigIn: [],
        tripsUserMemberIn: []
    },
    mutations: {
        setTrips(state, { trips }) {
            state.trips = trips;
        },
        setOwnerTrips(state, { ownerTrips }) {
            state.ownerTrips = ownerTrips;
        },
        remove(state, { id }) {
            const idx = state.trips.findIndex(currTrip => currTrip._id === id)
            state.trips.splice(idx, 1)
        },
        update(state, { trip }) {
            var idx = state.trips.findIndex(cuurTrip => cuurTrip._id === trip._id)
            state.trips.splice(idx, 1, trip)
        },
        save(state, { trip }) {
            state.trips.push(trip)
        },
        setTripsUserShared(state, { userId }) {
            state.tripsUserShared = state.trips.filter(currTrip => currTrip.owner._id === userId)
        },
        setTripsUserPendingIn(state, { userId }) {
            state.tripsUserPendigIn = state.trips.filter(currTrip => currTrip.pendings.find(currUser => currUser.userId === userId))
        },
        setTripsUserMemberIn(state, { userId }) {
            state.tripsUserMemberIn = state.trips.filter(currTrip => currTrip.members.find(currUser => currUser.userId === userId))
        }
    },
    getters: {
        trips(state) {
            return state.trips;
        },
        ownerTrips(state) {
            return state.ownerTrips;
        },
        tripsUserShared(state) {
            return state.tripsUserShared
        },
        tripsUserPendigIn(state) {
            return state.tripsUserPendigIn
        },
        tripsUserMemberIn(state) {
            return state.tripsUserMemberIn
        }

    },
    actions: {
        async loadTrips(context, { filter }) {
            try {
                const trips = await TripService.query(filter)
                context.commit({ type: 'setTrips', trips })
                if (context.getters.loggedInUser) {
                    var ownerTrips = trips.filter(
                        trip => trip.owner._id === context.getters.loggedInUser._id
                    );
                    context.commit({ type: 'setOwnerTrips', ownerTrips })
                }
            } catch (err) {
                LoggerService.error('71');
                throw err;
            }
        },
        async  getById(context, { tripId }) {
            try {
                const tripToShow = context.state.trips.find(currTrip => currTrip._id === tripId)
                if (!tripToShow) {
                    var trip = await TripService.getById(tripId)
                    return trip;
                } else return tripToShow
            }
            catch (err) {
                LoggerService.error('84');
                throw err;
            }
        },
        async remove(context, { trip, owner }) {
            const idx = owner.myTrips.findIndex(
                currTrip => currTrip.tripId === trip._id
            );
            owner.myTrips.splice(idx, 1);
            try {
                await TripService.remove(trip)
                await context.dispatch({ type: 'updateUser', owner })
                context.commit({ type: 'remove', id: trip._id })
            } catch (err) {
                LoggerService.error('98');
                throw err;
            }
        },
        async save(context, { trip }) {
            if (trip._id) {
                try {
                    const updatedTrip = await TripService.save(trip)
                    context.commit({ type: 'update', trip: updatedTrip })
                    return updatedTrip
                } catch (err) {
                    throw err;
                }
            } else {
                try {
                    const newTrip = await TripService.save(trip)
                    context.commit({ type: 'save', trip: newTrip })
                    return newTrip
                } catch (err) {
                    LoggerService.error('117');
                    throw err;
                }
            }
        },
        async uploadImg(context, { file }) {
            try {
                const url = await TripService.handleUploadImage(file)
                return url;
            } catch (err) {
                LoggerService.error('127');
                throw err;
            }
        },
        async joinToTrip(context, { user, trip, room }) {
            trip.pendings.push({ userId: user._id });
            user.pendingIn.push({ tripId: trip._id });
            try {
                await context.dispatch({ type: 'save', trip })
                await context.dispatch({ type: 'updateUser', user })
                await context.dispatch({ type: 'joinTrip', user, trip, room })
            } catch (err) {
                LoggerService.error('139');
                throw err;
            }

        },
        async removeUserFromTrip(context, { trip, user }) {
            const idx = trip.members.findIndex(
                currUser => currUser.userId === user._id
            );
            trip.members.splice(idx, 1);
            try {
                await context.dispatch({ type: 'save', trip })
            } catch (err) {
                LoggerService.error('152');
                throw err;
            }
        },
        async cancelRequesInTrip(context, { trip, user }) {
            const idx = trip.pendings.findIndex(
                currUser => currUser.userId === user._id
            );
            trip.pendings.splice(idx, 1);
            try {
                await context.dispatch({ type: 'save', trip })
            } catch (err) {
                LoggerService.error('164');
                throw err;
            }
        },
        async approveUserToTrip(context, { user, trip }) {
            user.memberIn.push({ tripId: trip._id });
            trip.members.push({ userId: user._id })

            const idxInUserPanding = user.pendingIn.findIndex(
                currTrip => currTrip.tripId === trip._id
            );
            user.pendingIn.splice(idxInUserPanding, 1);
            const idxInTripPendings = trip.pendings.findIndex(currUser => currUser.userId === user._id)
            trip.pendings.splice(idxInTripPendings, 1)
            try {
                await context.dispatch({ type: 'save', trip })
                await context.dispatch({ type: 'updateUser', user })
            } catch (err) {
                LoggerService.error('182');
                throw err;
            }
        },
        async rejectUserFromTrip(context, { user, trip }) {
            const idxInUserPanding = user.pendingIn.findIndex(currTrip => currTrip.tripId === trip._id);
            user.pendingIn.splice(idxInUserPanding, 1);
            const idxInTripPendings = trip.pendings.findIndex(currUser => currUser.userId === user._id)
            trip.pendings.splice(idxInTripPendings, 1)
            try {
                await context.dispatch({ type: 'save', trip })
                await context.dispatch({ type: 'updateUser', user })
            } catch (err) {
                LoggerService.error('195');
                throw err;
            }
        },
        async addLike(context, { trip, user }) {
            trip.likedBy.push({ userId: user._id })
            try {
                await context.dispatch({ type: 'save', trip })
            } catch (err) {
                LoggerService.error('204');
                throw err;
            }
        },
        async removeLike(context, { trip, user }) {
            var idx = trip.likedBy.findIndex(currUser => currUser.userId === user._id)
            trip.likedBy.splice(idx, 1)
            try {
                await context.dispatch({ type: 'save', trip })
            } catch (err) {
                LoggerService.error('214');
                throw err;
            }
        }
    }
}