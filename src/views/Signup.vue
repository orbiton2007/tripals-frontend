<template>
  <section class="section-signup">
    <div>
      <Header class="colorBg"></Header>
      <Login v-if="loginModal" />
    </div>
    <div class="signup-container">
      <div class="signup-form">
        <h2>Signup</h2>
        <form @submit.prevent="signup">
          <div class="row">
            <div class="col-25">
              <label>Email</label>
            </div>
            <div class="col-75">
              <input type="email" placeholder="Email" v-model="newUser.email" autofocus required />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Password</label>
            </div>
            <div class="col-75">
              <input type="password" placeholder="Password" v-model="newUser.pass" required />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>First Name</label>
            </div>
            <div class="col-75">
              <input type="text" placeholder="First Name" v-model="newUser.firstName" required />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Last Name</label>
            </div>
            <div class="col-75">
              <input type="text" placeholder="Last Name" v-model="newUser.lastName" required />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Country</label>
            </div>
            <div class="col-75">
              <input type="text" placeholder="Country" v-model="newUser.resCountry" required />
            </div>
          </div>

          <div class="row">
            <div class="col-25">
              <label>Upload Image</label>
            </div>
            <div class="col-75">
              <input type="file" ref="upload" />
            </div>
          </div>

          <div class="row">
            <button class="btn-signup">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script>
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  data() {
    return {
      newUser: {
        email: "",
        pass: "",
        firstName: "",
        lastName: "",
        imgUrl:
          "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg",
        resCountry: "",
        aboutMe: "",
        yearOfBirth: "",
        interests: "",
        notifications: {roomId: ''},
        pendingIn: [],
        memberIn: [],
        myTrips: []
      }
    };
  },
  created() {},
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async signup() {
      const file = this.$refs.upload.files[0];
      if (file) {
        const url = await this.$store.dispatch({ type: "uploadImg", file });
        this.newUser.imgUrl = url;
      }
      try {
        const newRoom = { msgs: [], requests: [] };
        const room = await this.$store.dispatch({ type: "addRoom", newRoom });
        this.newUser.notifications.roomId = room._id;
        await this.$store.dispatch({
          type: "signup",
          userCredential: this.newUser
        });
        this.$router.push("/");
        this.$swal("Signup Successfully", "", "success");
      } catch (err) {
        this.$router.push("/");
        this.$swal("Email exsits, please login", "", "error");
      }
    }
  },
  components: {
    Header,
    Login
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_Signup.scss";
</style>
