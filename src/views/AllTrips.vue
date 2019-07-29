<template>
  <section class="trip-list">
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in trips" :trip="trip" :key="i" />
    </ul>
  </section>
</template>

<script>
import TripPreview from "../components/TripPreview";
export default {
  computed: {
    trips() {
      return this.$store.getters.trips;
    }
  },
  async created() {
    try {
      await this.$store.dispatch({ type: "loadTrips" });
    } catch (err) {
      console.log(err);
    }
  },
  components:{
      TripPreview
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_AllTrips.scss";
</style>

