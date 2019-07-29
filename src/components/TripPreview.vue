<template>
  <swiperSlide class="trip-preview">
    <div @click="goDetails">
      <v-img xs2 :src="trip.imgUrl" aspect-ratio="1.6"></v-img>
      <div class="avatars flex space-between">
        <div v-if="trip.members.length" class="flex">
          <div v-for="(member, i) in members" :key="i" class="participants">
            <img class="img-participant" v-if="i<3" :src="member.imgUrl" />
          </div>
        </div>
        <div class="owner">
          <img v-if="owner" :src="owner.imgUrl" />
        </div>
      </div>

      <div class="flex space-between">
        <div>
          <h4>{{trip.destination}} - {{trip.title}}</h4>
          <h5>{{trip.start| moment("MMMM Do ")}} - {{trip.end| moment("MMMM Do ")}}</h5>
        </div>
        <div>
          <span class="likes-length">({{trip.likedBy.length}})</span>
          <i class="material-icons like">favorite_border</i>
        </div>
      </div>
    </div>
  </swiperSlide>
</template>

<script>
import { swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    trip: Object
    // validator:()=>{
    //     return
    // }
  },
  data() {
    return {
      members: [],
      owner: {}
    };
  },
  async created() {
    try {
      this.trip.members.forEach(async userId => {
        var member = await this.$store.dispatch({
          type: "getUserById",
          id: userId.userId
        });
        this.members.push(member);
      });
      this.owner = await this.$store.dispatch({
        type: "getUserById",
        id: this.trip.owner._id
      });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {},
  methods: {
    goDetails() {
      this.$router.push(`/TripDetails/${this.trip._id}`);
    }
  },
  components: {
    swiperSlide
  }
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_TripPreview.scss";
</style>

