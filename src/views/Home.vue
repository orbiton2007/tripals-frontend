<template>
  <section class="home">
    <div class="header">
      <AppHeader />
      <Login v-if="loginModal" @setFilter="setFilter" />
      <div class="title-filter-container">
        <h1 class="title-home">
          It’s a big world.
          Exploring it with friends
        </h1>
        <TripFilter class="filter" @setFilter="setFilter" />
      </div>
    </div>

    <!-- <button class="btn-add" @click="goEdit">New Trip</button> -->
    <div v-if="ownerTrips.length && loggedInUser" class="my-trips flex column">
      <h2 class="my-trips-title">My Trips</h2>
      <TripList :trips="ownerTrips" />
    </div>
    <div class="all-trips flex column">
      <div class="title-btn-div flex space-between">
        <h2 class="all-trips-title">All Trips</h2>
        <router-link class="btn-show-all" to="/AllTrips">Show all</router-link>
      </div>
      <TripListTrending :trips="trips" />
    </div>
  </section>
</template>


<script>
import TripList from "../components/TripList";
import TripListTrending from "../components/TripListTrending";
import TripFilter from "../components/TripFilter";
import AppHeader from "../components/Header";
import Login from "../components/Login";

export default {
  data() {
    return {};
  },
  created() {
    this.setFilter();
  },
  computed: {
    trips() {
      return this.$store.getters.trips;
    },
    ownerTrips() {
      return this.$store.getters.ownerTrips;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async setFilter(filter = {}) {
      try {
        await this.$store.dispatch({
          type: "loadTrips",
          filter
        });
      } catch (err) {
        console.log(err);
      }
    }
    // goEdit() {
    //   this.$router.push("/TripEdit");
    // }
  },
  components: {
    TripList,
    TripListTrending,
    TripFilter,
    AppHeader,
    Login
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Home.scss";
</style>