<template>
  <section class="nav" app :class="{ colorBg: colorBg }">
    <div class="navbar">
      <div class="iconMenu-logo-div">
      <i class="material-icons menu" @click="openMenu">menu</i>
      <div class="logo-container">
        <h1 class="logo">TRIPALS</h1>
      </div>

      </div>
      <div class="nav-links">
        <router-link v-if="!loggedInUser" to="/Signup">
          <span class="dark">Signup</span>
        </router-link>
        <button class="btn-link dark" v-if="!loggedInUser" @click="toggleLogin">Login</button>
        <a href="#" @click="openRequests" v-if="loggedInUser">
          <span class="dark">Requests</span>
        </a>
        <router-link to="/TripEdit">
          <span class="dark btn-new-trip">New Trip</span>
        </router-link>
        <router-link to="/about">
          <span class="dark">About</span>
        </router-link>
        <router-link to="/">
          <span class="dark">Home</span>
        </router-link>
        <img v-if="loggedInUser" @click="openUserMenu" class="user-img" :src="loggedInUser.imgUrl" />
      </div>
      <img v-if="loggedInUser" @click="openUserMenu" class="user-img-menu" :src="loggedInUser.imgUrl" />
      <UserMenu v-if="showUserMenu" :user="loggedInUser" />
      <AppMenu v-if="showMenu" @closeMenu="closeMenu"/>
      <Requests v-if="showRequests" />
    </div>
  </section>
</template>


<script>
import UserMenu from "./UserMenu";
import AppMenu from "./AppMenu";
import Requests from "./Requests";
export default {
  props: {
    colorBg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenu: false,
      showUserMenu: false,
      showRequests: false
    };
  },
  created() {},
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    toggleLogin() {
      this.$store.commit("toggleLogin");
    },
    openUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    openMenu() {
      this.showMenu = !this.showMenu;
    },
    openRequests() {
      this.showRequests = !this.showRequests;
    },
    closeMenu(){
      this.showMenu = !this.showMenu;
    }
  },
  components: {
    UserMenu,
    AppMenu,
    Requests
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Header.scss";
</style>

