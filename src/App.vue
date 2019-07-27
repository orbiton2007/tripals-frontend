<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>



<script>
import SocketService from "./Services/SocketService";
export default {
  name: "App",
  data() {
    return {};
  },
  async created() {
    if (this.loggedInUser) {
      try {
        await this.$store.dispatch({
          type: "createRoom",
          loggedInUser: this.loggedInUser
        });
      } catch (err) {
        throw err;
      }
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {},
  components: {}
};
</script>

