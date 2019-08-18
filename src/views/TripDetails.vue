<template>
  <section v-if="trip && owner" class="trip-details">
    <AppHeader class="colorBg" />
    <div class="container">
      <Login v-if="loginModal" />
      <div class="owner-details flex column space-between">
        <div class="img-name">
          <img class="user-img" :src="owner.imgUrl" />
          <h4>Owner - {{owner.firstName}} {{owner.lastName}}</h4>
        </div>
        <div class="chat-title">
          <p>
            Start talking to the members of the trip &nbsp;&nbsp;
            <i
              class="material-icons"
              @click="toggleChat"
            >chat</i>
          </p>
        </div>
      </div>
      <div class="trip-desc">
        <div class="details-btns flex column space-between">
          <div class="details flex space-between">
            <div>
              <h2>
                {{trip.destination}}, {{trip.title}}
                <span>
                  <span class="likes-length">({{trip.likedBy.length}})</span>
                  <i class="material-icons like" v-if="unlikeTrip" @click="addLike">favorite_border</i>
                  <i class="material-icons like" v-if="likeTrip" @click="removeLike">favorite</i>
                </span>
              </h2>
              <h4>{{trip.start| moment("MMMM Do ")}} - {{trip.end| moment("MMMM Do ")}}</h4>
            </div>
            <div>
              <i
                class="material-icons"
                v-if="loggedInUser && loggedInUser._id === trip.owner._id"
                @click="goEdit"
              >edit</i>
              <i
                class="material-icons"
                v-if="loggedInUser && loggedInUser._id === trip.owner._id"
                @click="remove(trip)"
              >delete_outline</i>
              <!-- <h2 class="msg-join" v-if="!loggedInUser">LOGIN TO JOIN US!</h2> -->
              <button
                class="btn-status"
                v-if="loggedInUser && owner._id !== loggedInUser._id && !memberIn && !pendingIn"
                @click="joinTrip"
              >Ask to join</button>
              <button
                class="btn-status"
                v-if="loggedInUser && owner._id !== loggedInUser._id && memberIn"
                @click="leaveTrip"
              >Leave</button>
              <button
                class="btn-status"
                v-if="loggedInUser && owner._id !== loggedInUser._id && pendingIn"
                @click="cancelRequest"
              >Cancel request</button>
            </div>
          </div>
          <div>
            <p>{{trip.desc}}</p>
          </div>
          <div>
            <ul class="types flex wrap">
              <li class="type" v-for="(type, i) in trip.types" :key="i">{{type}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="map">
        <google-map :location="trip.destination" />
      </div>
      <div class="trip-members">
        <h2>Members</h2>
        <ul class="members flex wrap">
          <TripMembers v-for="(userId,i) in trip.members" :key="i" :userId="userId" />
        </ul>
        <h2 v-if="loggedInUser && owner._id === loggedInUser._id && trip.pendings.length">Pendings</h2>
        <ul class="pendings flex wrap" v-if="loggedInUser && owner._id === loggedInUser._id">
          <TripPendings
            v-for="(userId,i) in trip.pendings"
            :key="i"
            :userId="userId"
            :owner="owner"
            :trip="trip"
          />
        </ul>
      </div>
      <div v-if="showChat" class="trip-chat">
        <TripChat :trip="trip" @closeChat="toggleChat" />
      </div>
    </div>
  </section>
</template>

<script>
import AppHeader from "../components/Header";
import GoogleMap from "../components/GoogleMap";
import TripChat from "../components/TripChat";
import Login from "../components/Login";
import TripMembers from "../components/TripMembers";
import TripPendings from "../components/TripPendings";
import SocketService from "../Services/SocketService";
export default {
  data() {
    return {
      trip: null,
      tripId: "",
      owner: null,
      forecastWeather: null,
      showChat: false
    };
  },
  async created() {
    SocketService.on("update trip", async trip => {
      this.trip = trip;
    });
    this.tripId = this.$route.params.id;
    try {
      this.trip = await this.$store.dispatch({
        type: "getById",
        tripId: this.tripId
      });
      this.owner = await this.$store.dispatch({
        type: "getUserById",
        id: this.trip.owner._id
      });
      await this.$store.dispatch({
        type: "getRoom",
        id: this.owner.notifications.roomId
      });
      await this.$store.dispatch({
        type: "socketInTripDetails",
        tripId: this.trip._id
      });
    } catch (err) {
      console.log("in created", err);
    }
  },
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    memberIn() {
      let alreadyMember = this.trip.members.some(
        currUser => currUser.userId === this.loggedInUser._id
      );
      return alreadyMember;
    },
    pendingIn() {
      let pendingRequest = this.trip.pendings.some(
        currUser => currUser.userId === this.loggedInUser._id
      );
      return pendingRequest;
    },
    unlikeTrip() {
      if (this.loggedInUser) {
        let userId = this.trip.likedBy.find(
          currUser => currUser.userId === this.loggedInUser._id
        );
        if (!userId) return true;
      } else return true;
    },
    likeTrip() {
      if (this.loggedInUser) {
        return this.trip.likedBy.some(
          currUser => currUser.userId === this.loggedInUser._id
        );
      }
    }
  },
  methods: {
    goEdit() {
      this.$router.push(`/TripEdit/${this.trip._id}`);
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
    async addLike() {
      if (!this.loggedInUser) {
        this.$store.commit("toggleLogin");
        return;
      }
      try {
        await this.$store.dispatch({
          type: "addLike",
          trip: this.trip,
          user: this.loggedInUser
        });
      } catch (err) {
        console.log(err);
      }
    },
    async removeLike() {
      if (!this.loggedInUser) {
        this.$store.commit("toggleLogin");
        return;
      }
      try {
        await this.$store.dispatch({
          type: "removeLike",
          trip: this.trip,
          user: this.loggedInUser
        });
      } catch (err) {
        console.log(err);
      }
    },
    async remove(trip) {
      try {
        await this.$store.dispatch({ type: "remove", trip, owner: this.owner });
        this.$router.push("/");
      } catch (err) {
        console.log("not remove", err);
      }
    },
    async joinTrip() {
      try {
        const room = await this.$store.dispatch({
          type: "getRoom",
          id: this.owner.notifications.roomId
        });
        await this.$store.dispatch({
          type: "joinToTrip",
          user: this.loggedInUser,
          trip: this.trip,
          room
        });
      } catch (err) {
        console.log("not update", err);
      }
    },
    async cancelRequest() {
      try {
        await this.$store.dispatch({
          type: "cancelRequestInTrip",
          trip: this.trip,
          user: this.loggedInUser
        });
        await this.$store.dispatch({
          type: "cancelRequesInUser",
          trip: this.trip,
          user: this.loggedInUser
        });
      } catch (err) {
        console.log("not update", err);
      }
    },
    async leaveTrip() {
      try {
        await this.$store.dispatch({
          type: "removeUserFromTrip",
          trip: this.trip,
          user: this.loggedInUser
        });
        await this.$store.dispatch({
          type: "removeTripFromUser",
          trip: this.trip,
          user: this.loggedInUser
        });
      } catch (err) {
        console.log("not update", err);
      }
    }
  },
  async destroyed() {
    await this.$store.dispatch({
      type: "disconnectFromTrip",
      tripId: this.trip._id
    });
  },
  components: {
    AppHeader,
    GoogleMap,
    TripChat,
    Login,
    TripMembers,
    TripPendings
  }
};
</script>




<style lang="scss" scoped>
@import "../styles/views/_TripDetails.scss";
</style>