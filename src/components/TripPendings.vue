<template>
  <li class="_Pending" v-if="user && owner && trip">
    <div class="flex">
      <img class="user-img-_Pending" @click="goUserProfile" :src="user.imgUrl" />
      <div>
        <h5 class="user-details-_Pending-name">{{user.firstName}} {{user.lastName}}</h5>
        <h5 class="user-details-_Pending-age">{{user.age}}</h5>
      </div>
    </div>
    <div class="flex">
      <i
        class="material-icons"
        v-if="loggedInUser && owner._id === loggedInUser._id"
        @click="requestApproved"
      >check</i>
      <i
        class="material-icons"
        v-if="loggedInUser && owner._id === loggedInUser._id"
        @click="requestRejected"
      >close</i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    owner: Object,
    userId: Object,
    trip: Object
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    try {
      this.user = await this.$store.dispatch({
        type: "getUserById",
        id: this.userId.userId
      });
    } catch (err) {
      console.log('unknown',err);
      
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    goUserProfile() {
      this.$router.push(`/UserProfile/${this.user._id}`);
    },
    async requestApproved() {
      try {
        this.$store.dispatch({
          type: "approveUserToTrip",
          user: this.user,
          trip: this.trip
        });
      } catch (err) {
        console.log("not saved", err);
      }
    },
    async requestRejected() {
      try {
        await this.$store.dispatch({
          type: "rejectUserFromTrip",
          user: user,
          trip: this.trip
        });
      } catch (err) {
        console.log("not saved", err);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Pending.scss";
</style>
