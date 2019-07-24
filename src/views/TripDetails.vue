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
              <h2>{{trip.destination}}, {{trip.title}}</h2>
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
      <!-- <div class="trip-weather">
      <Weather :location="trip.destination" />
      <Weather :location="trip.destination" @weather="setWeather" />
      <template v-if="forecastWeather">
        <div class="render-weather">
          <div v-for="(item,i) in forecastWeather" :key="i">
            <img class="weather-img" width="50" :src="item.img" />
            <p class="weather-temp">{{item.minTemp}}/{{item.maxTemp}}</p>
          </div>
        </div>
      </template>
      </div>-->
      <div class="trip-members">
        <!-- <button class="btn-participating" @click="toggleMembersModal">
          Members
          <span>{{trip.members.length}}</span>
        </button>
        <button
          class="btn-pending"
          @click="showPendingModal"
          v-if="loggedInUser && owner._id === loggedInUser._id"
        >
          Pendings
          <span class="waitingList-length" v-if="trip.pendings">{{trip.pendings.length}}</span>
        </button>-->
        <h2>Members</h2>
        <ul class="members flex wrap">
          <TripMembers v-for="(userId,i) in trip.members" :key="i" :userId="userId" />
        </ul>
        <ul class="pendings" v-if="loggedInUser && owner._id === loggedInUser._id">
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
import Weather from "../components/Weather";
import TripChat from "../components/TripChat";
import Login from "../components/Login";
import TripMembers from "../components/TripMembers";
import TripPendings from "../components/TripPendings";

export default {
  data() {
    return {
      trip: null,
      owner: null,
      forecastWeather: null,
      showChat: false
    };
  },
  async created() {
    const tripId = this.$route.params.id;
    try {
      this.trip = await this.$store.dispatch({ type: "getById", tripId });
      this.owner = await this.$store.dispatch({
        type: "getUserById",
        id: this.trip.owner._id
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
      var alreadyMember = this.loggedInUser.memberIn.find(
        currTrip => currTrip.tripId === this.trip._id
      );
      if (alreadyMember) return true;
      else return false;
    },
    pendingIn() {
      var pendingRequest = this.loggedInUser.pendingIn.find(
        currTrip => currTrip.tripId === this.trip._id
      );
      if (pendingRequest) return true;
      else return false;
    }
  },
  methods: {
    goEdit() {
      this.$router.push(`/TripEdit/${this.trip._id}`);
    },
    toggleChat() {
      this.showChat = !this.showChat;
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
        // socket join
        await this.$store.dispatch({
          type: "joinTrip",
          user: this.loggedInUser,
          trip: this.trip
        });
      } catch (err) {
        console.log("not update", err);
      }
    },
    async cancelRequest() {
      try {
        await this.$store.dispatch({
          type: "cancelRequesInTrip",
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
    },
    setWeather(weather) {
      this.forecastWeather = weather;
    }
  },
  components: {
    AppHeader,
    GoogleMap,
    Weather,
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