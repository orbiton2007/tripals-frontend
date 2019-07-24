<template>
  <section v-if="user" class="user-menu flex column">
    <a href="#" @click="goUserProfile">User Profile</a>
    <a href="#" @click="logout">Log Out</a>
    <h2></h2>
    <h2></h2>
  </section>
</template>


<script>
export default {
  props: {
      user: Object
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    logout() {
      this.$store.dispatch({ type: "logout" });
    },
    goUserProfile() {
      this.$router.push(`/UserProfile/${this.user._id}`);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_UserMenu.scss";
</style>

