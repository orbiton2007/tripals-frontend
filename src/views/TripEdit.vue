<template>
  <section class="trip-edit">
    <AppHeader class="colorBg" />
    <Login v-if="loginModal" />
    <div class="edit-form-title">
      <h2 v-if="trip._id">Edit</h2>
      <h2 v-else>New Trip</h2>
      <form @submit.prevent="save">
        <div class="row">
          <div class="col-25">
            <label for="Title">Title</label>
          </div>
          <div class="col-75">
            <input type="text" v-model="trip.title" placeholder="Title" required autofocus />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label v-if="!trip._id">Destination</label>
          </div>
          <div v-if="!trip._id" class="col-75">
            <GoogleAutocomplete @placeSelected="placeSelected($event)" required></GoogleAutocomplete>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Start Date</label>
          </div>
          <div class="col-75">
            <input type="date" class="short-input" v-model="trip.start" required />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>End Date</label>
          </div>
          <div class="col-75">
            <input type="date" class="short-input" v-model="trip.end" required />
          </div>
        </div>

        <div class="checkBox-container">
          <!-- <v-container fluid> -->
          <div>
            <v-checkbox v-model="trip.types" label="Day trip" value="Day trip"></v-checkbox>
            <v-checkbox v-model="trip.types" label="Culture" value="Culture"></v-checkbox>
          </div>
          <div>
            <v-checkbox v-model="trip.types" label="Historical" value="Historical"></v-checkbox>
            <v-checkbox v-model="trip.types" label="Guided Tour" value="Guided Tour"></v-checkbox>
          </div>
          <div>
            <v-checkbox v-model="trip.types" label="Culinary" value="Culinary"></v-checkbox>
            <v-checkbox v-model="trip.types" label="Spiritual" value="Spiritual"></v-checkbox>
          </div>
          <div>
            <v-checkbox v-model="trip.types" label="Camping" value="Camping"></v-checkbox>
            <v-checkbox v-model="trip.types" label="Hiking" value="Hiking"></v-checkbox>
          </div>
          <div>
            <v-checkbox v-model="trip.types" label="Beach" value="Beach"></v-checkbox>
            <v-checkbox v-model="trip.types" label="Markets" value="Markets"></v-checkbox>
          </div> 
        </div>

        <div class="row">
          <div class="col-25">
            <label for="Description">Description</label>
          </div>
          <div class="col-75">
            <textarea
              v-model="trip.desc"
              id="Description"
              name="Description"
              placeholder="Description"
              style="height:200px"
            ></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Meeting Point</label>
          </div>
          <div class="col-75">
            <input type="text" v-model="trip.meetingPoint" placeholder="Meeting Point" />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Meeting Time</label>
          </div>
          <div class="col-75">
            <input
              type="time"
              v-model="trip.meetingTime"
              placeholder="Meeting Time"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Max Participants</label>
          </div>
          <div class="col-75">
            <input type="number" v-model="trip.participantCap" min="2" placeholder="2"/>
          </div>
        </div>

        <div class="row">
          <div class="col-25">
            <label>Upload Image</label>
          </div>
          <div class="col-75">
            <input type="file"  ref="upload" />
          </div>
        </div>
        
        <div class="row">

        <button>Save</button>
        </div>
      </form>
    </div>
  </section>
</template>


<script>
import AppHeader from "../components/Header";
import GoogleAutocomplete from "../components/GoogleAutocomplete";
import Login from "../components/Login";
export default {
  data() {
    return {
      trip: {
        title: "",
        desc: "",
        destination: null,
        imgUrl:
          "https://images.unsplash.com/photo-1562386130-926081dc4fbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
        types: [],
        start: "",
        end: "",
        likedBy: [],
        participantCap: "",
        meetingTime: "",
        meetingPoint: "",
        pendings: [],
        members: [],
        chat: { _id: "" }
      }
    };
  },
  async created() {
    const tripId = this.$route.params.id;
    if (tripId) {
      this.trip = await this.$store.dispatch({ type: "getById", tripId });
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  methods: {
    async save() {
      if (!this.loggedInUser) {
        this.$store.commit("toggleLogin");
        return;
      }
      const file = this.$refs.upload.files[0];
      // loading.io
      if (file) {
        try {
          const url = await this.$store.dispatch({ type: "uploadImg", file });
          this.trip.imgUrl = url;
        } catch (err) {
          console.log(err);
          // swal
        }
      }
      if (!this.trip._id) {
        try {
          const newChat = { msgs: [] };
          const chat = await this.$store.dispatch({ type: "addChat", newChat });
          this.trip.chat._id = chat._id;
        } catch (err) {
          console.log("cant add chat", err);
        }
        try {
          const newTrip = await this.$store.dispatch({
            type: "save",
            trip: this.trip
          });
          this.loggedInUser.myTrips.push({ tripId: newTrip._id });
        } catch (err) {
          console.log(err);
        }
        try {
          await this.$store.dispatch({
            type: "updateUser",
            user: this.loggedInUser
          });
          this.$swal("Edit Successfully", "", "success");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await this.$store.dispatch({
            type: "save",
            trip: this.trip
          });
          this.$swal("Added Successfully", "", "success");
        } catch (err) {
          this.$swal("Check if login", "", "error");
        }
      }
      this.$router.push("/");
    },
    placeSelected(e) {
      this.trip.destination = e.administrative_area_level_1;
    }
  },
  components: {
    AppHeader,
    GoogleAutocomplete,
    Login
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/views/_TripEdit.scss";
</style>