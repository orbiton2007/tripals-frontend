<template>
  <section class="requests">
    <i class="material-icons btn-close" @click="closeRequests">close</i>
    <ul v-if="room && requests">
      <li class="request" v-for="(msg, i) in requests" :key="i">{{msg}}</li>
    </ul>
  </section>
</template>


<script>
import SocketService from "../Services/SocketService";
export default {
  data() {
    return {
      room: null
    };
  },
  async created() {
    this.room = await this.$store.dispatch({
      type: "getRoom",
      id: this.loggedInUser.notifications.roomId
    });
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    requests() {
      return this.$store.getters.requests;
    }
  },
  methods: {
    closeRequests() {
      this.$emit("requestsModal");
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Requests.scss";
</style>
