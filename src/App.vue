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
    SocketService.on("welcome", txt => {
      console.log(txt);
      alert("txt arrive");
    }); 
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

