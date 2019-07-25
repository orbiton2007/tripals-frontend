<template>
  <section class="requests">
    <h4>Notifications</h4>
    <ul v-if="loggedInUser">
      <li v-for="(msg, i) in loggedInUser.notifications" :key="i">{{msg}}</li>
    </ul>
  </section>
</template>


<script>
import SocketService from "../Services/SocketService";
export default {
  data() {
    return {
    //   notifications: []
    };
  },
  created() {
    //   this.notifications = this.loggedInUser.notifications
    
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {}
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_Requests.scss";
</style>
