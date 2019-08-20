<template>
  <section class="user-profile" v-if="user">
    <Header class="colorBg" />
    <Login v-if="loginModal" />
    <div class="container">
      <div class="user-details">
        <img class="img-user" :src="user.imgUrl" />
        <h3>{{user.firstName}} {{user.lastName}}</h3>
        <p class="about-me">{{user.aboutMe}}</p>
      </div>
      <div class="user-trips">
        <h3>{{user.firstName}} shared trips</h3>
        <div class="ownerTrips-container">
          <TripList :trips="tripsUserShared" />
        </div>
      </div>
      <div class="member-in">
        <h3>Member in</h3>
        <TripList :trips="tripsUserMemberIn" />
      </div>
      <div class="pendin-in">
        <h3>Pending in</h3>
        <TripList :trips="tripsUserPendigIn" />
      </div>
    </div>
  </section>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
import TripList from "../components/TripList";
export default {
  data() {
    return {
      user: null
    };
  },
  async created() {
    const userId = this.$route.params.id;
    const userToShow = await this.$store.dispatch({
      type: "getUserById",
      id: userId
    });
    this.user = userToShow;
    try {
      await this.$store.dispatch({
        type: "loadTrips"
      });
      this.$store.commit({ type: "setTripsUserShared", userId });
      this.$store.commit({ type: "setTripsUserPendingIn", userId });
      this.$store.commit({ type: "setTripsUserMemberIn", userId });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    },
    tripsUserShared() {
      return this.$store.getters.tripsUserShared;
    },
    tripsUserPendigIn() {
      return this.$store.getters.tripsUserPendigIn;
    },
    tripsUserMemberIn() {
      return this.$store.getters.tripsUserMemberIn;
    }
  },
  components: {
    Login,
    Header,
    TripList
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_UserProfile.scss";
</style>