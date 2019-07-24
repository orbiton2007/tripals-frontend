<template>
  <section class="nav" app :class="{ colorBg: colorBg }">
    <div class="navbar">
      <i class="material-icons menu" @click="openMenu">menu</i>
      <div class="logo-container">
        <!-- <img src="../assets/img/logo/logo-dark.png" /> -->
        <h1 class="logo">TRIPALS</h1>
      </div>
      <!-- <v-btn @click="showNotif('main', 'success')"></v-btn> -->
      <div class="nav-links">
        <router-link v-if="!loggedInUser" to="/Signup">
          <span class="dark">Signup</span>
        </router-link>
        <button class="btn-link dark" v-if="!loggedInUser" @click="toggleLogin">Login</button>
        <router-link to="/about">
          <span class="dark">About</span>
        </router-link>
        <router-link to="/">
          <span class="dark">Home</span>
        </router-link>
        <img v-if="loggedInUser" @click="openUserMenu" class="user-img" :src="loggedInUser.imgUrl" />
      </div>
      <UserMenu v-if="showUserMenu" :user="loggedInUser" />
      <AppMenu v-if="showMenu" />
    </div>
  </section>
</template>


<script>
import UserMenu from "./UserMenu";
import AppMenu from "./AppMenu";
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
      showUserMenu: false
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
    }
  },
  components: {
    UserMenu,
    AppMenu
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Header.scss";
</style>

