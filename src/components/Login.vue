<template>
  <section v-if="!loggedInUser" class="login-container">
    <i class="material-icons btn-close" @click="closeLogin">close</i>
    <h2>Login</h2>
    <form @submit.prevent="login" class="flex column">
      <input
        type="email"
        placeholder="Enter Email"
        minlength="3"
        v-model="user.email"
        required
        autofocus
      />
      <input
        type="password"
        placeholder="Enter Password"
        minlength="2"
        v-model="user.pass"
        required
      />
      <button>Login</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: { email: "", pass: "" },
      // loggedInUser: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    async login() {
      // loading.io
      try {
        await this.$store.dispatch({ type: "login", user: this.user });
        this.user = { email: "", pass: "" };
        this.$emit("setFilter");
        this.$swal("Login Successfully", "", "success");
      } catch (err) {
        this.$swal("Wrong password or username", "", "error");
      }
    },
    closeLogin(){
      this.$store.commit("toggleLogin");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Login.scss";
</style>
