<template>
  <div class="trip-preview" @click="goDetails">
    <v-img xs2 :src="trip.imgUrl" aspect-ratio="1.6"></v-img>

    <div>
      <h4>{{trip.destination}} - {{trip.title}}</h4>
      <h5>{{trip.start| moment("MMMM Do ")}} - {{trip.end| moment("MMMM Do ")}}</h5>
    </div>
    <div class="avatars">
      <template v-if="trip.members.length">
        <v-avatar v-for="(member, i) in members" :key="i" class="participants" size="38px">
          <img class="img-participant" v-if="i<3" :src="member.imgUrl" />
        </v-avatar>
      </template>
        <!-- <v-avatar class="owner" size="60px">
          <img v-if="owner" :src="owner.imgUrl" />
        </v-avatar> -->
    </div>
  </div>
</template>

<script>
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
      // owner: {}
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
      // this.owner = await this.$store.dispatch({
      //   type: "getUserById",
      //   id: this.trip.owner._id
      // });
    } catch (err) {
      console.log(err);
    }
  },
  computed: {},
  methods: {
    goDetails() {
      this.$router.push(`/TripDetails/${this.trip._id}`);
    }
  }
};
</script>



<style lang="scss" scoped>
@import "../styles/components/_TripPreview.scss";
</style>

