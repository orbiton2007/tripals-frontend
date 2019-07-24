<template>
  <section class="menu flex column">
    <div>
      <router-link class="link-menu" to="/">Home</router-link>
    </div>
    <div>
      <router-link class="link-menu" to="/about">About</router-link>
    </div>
    <div>
      <button class="btn-link dark link-menu" v-if="!loggedInUser" @click="toggleLogin">Login</button>
    </div>
    <div>
      <router-link class="link-menu" v-if="!loggedInUser" to="/Signup">Signup</router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
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
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_AppMenu.scss";
</style>
