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

