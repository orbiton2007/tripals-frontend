<template>
  <section class="requests">
    <h4>Notifications</h4>
    <ul v-if="requests">
      <li v-for="(msg, i) in requests" :key="i">{{msg}}</li>
    </ul>
  </section>
</template>


<script>
import SocketService from "../Services/SocketService";
export default {
  data() {
    return {
      // requests: []
    };
  },
  created() {
    // this.requests = SocketService.getRequests()
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    requests() {
      return this.$store.getters.requests;
    }
  },
  methods: {}
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Requests.scss";
</style>
