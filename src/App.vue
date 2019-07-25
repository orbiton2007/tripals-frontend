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
  created() {
    SocketService.on("welcome", msg => {
      console.log(msg);
      this.loggedInUser.notifications.push(msg)
    //   this.notifications.push(msg);
        // alert("txt arrive");
    }); 
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

