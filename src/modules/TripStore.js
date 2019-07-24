import TripService from '../Services/TripService.js'
import UserService from '../Services/UserService.js'
import SocketService from '../Services/SocketService.js'


export default {
    // strict: true,
    state: {
        trips: [],
        ownerTrips: [],
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
    },
    getters: {
        trips(state) {
            return state.trips;
        },
        ownerTrips(state) {
            return state.ownerTrips;
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
                // return trips;
            } catch (err) {
                throw err;
            }
        },
        async  getById(context, { tripId }) {
            try {
                const trip = await TripService.getById(tripId)
                return trip;
            }
            catch (err) {
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
                await UserService.save(owner)
                context.commit({ type: 'remove', id: trip._id })
            } catch (err) {
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
                    throw err;
                }
            }
        },
        async uploadImg(context, { file }) {
            try {
                const url = await TripService.handleUploadImage(file)
                return url;
            } catch (err) {
                throw err;
            }
        },
        async joinTrip(context, { user, trip }) {
            trip.pendings.push({ userId: user._id });
            user.pendingIn.push({ tripId: trip._id });
            try {
                await TripService.save(trip)
                await UserService.save(user)
            } catch (err) {
                throw err
            }
            SocketService.emit('join trip', { user, owner })

        },
        async removeUserFromTrip(context, { trip, user }) {
            const idx = trip.members.findIndex(
                currUser => currUser.userId === user._id
            );
            trip.members.splice(idx, 1);
            try {
                await TripService.save(trip)
            } catch (err) {
                throw err
            }
        },
        async cancelRequesInTrip(context, { trip, user }) {
            const idx = trip.pendings.findIndex(
                currUser => currUser.userId === user._id
            );
            trip.pendings.splice(idx, 1);
            try {
                await TripService.save(trip)
            } catch (err) {
                throw err
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
                await TripService.save(trip)
                await UserService.save(user)
            } catch (err) {
                throw err
            }
        },
        async rejectUserFromTrip(context, { user, trip }) {
            const idxInUserPanding = user.pendingIn.findIndex(currTrip => currTrip.tripId === trip._id);
            user.pendingIn.splice(idxInUserPanding, 1);
            const idxInTripPendings = trip.pendings.findIndex(currUser => currUser.userId === user._id)
            trip.pendings.splice(idxInTripPendings, 1)

            try {
                await TripService.save(trip)
                await UserService.save(user)
            } catch (err) {
                throw err
            }
        }
    }
}