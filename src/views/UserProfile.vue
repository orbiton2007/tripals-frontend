<template>
  <section v-if="user">
    <Header class="colorBg" />
    <Login v-if="loginModal" />
    <div class="title-form-container">
      <form @submit.prevent="save" class="flex column">
        <h2>User Porfile</h2>
        <div class="div-img-user">
          <img class="user-img" :src="user.imgUrl" />
        </div>
        <label>
          First Name
          <div>
            <input type="text" class="short-input" v-model="user.firstName" />
          </div>
        </label>
        <label>
          First Last
          <div>
            <input type="text" class="short-input" v-model="user.lastName" />
          </div>
        </label>
        <label>
          About Me
          <div>
            <textarea cols="30" rows="10" v-model="user.aboutMe" placeholder="About Me"></textarea>
          </div>
        </label>
        <label>
          Interests
          <div>
            <textarea cols="30" rows="10" v-model="user.interests" placeholder="Interests"></textarea>
          </div>
        </label>
        <input type="file" class="short-input" />
        <button>Save</button>
      </form>
    </div>
  </section>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  data() {
    return {
      user: null
    };
  },
  async created() {
    const userId = this.$route.params.id;
    const userToShow = await this.$store.dispatch({
      type: "getUserById",
      id: userId
    });
    this.user = userToShow;
  },
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async save(ev) {
      const file = ev.target[4].files[0];
      if (file) {
        try {
          const url = await this.$store.dispatch({ type: "uploadImg", file });
          this.user.imgUrl = url;
        } catch (err) {
          console.log(err);
          // swal
        }
      }
      try {
        await this.$store.dispatch({ type: "updateUser", user: this.user });
        await this.$store.dispatch({
          type: "getUsers"
        });
        this.$router.push("/");
        this.$swal("Edit Successfully", "", "success");
      } catch (err) {
        console.log(err);
        // swal
      }
    }
  },
  components: {
    Login,
    Header
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_UserProfile.scss";
</style>



