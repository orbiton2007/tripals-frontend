<template>
  <section class="trip-list">
    <AppHeader class="colorBg" />
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in trips" :trip="trip" :key="i" />
    </ul>
  </section>
</template>

<script>
import TripPreview from "../components/TripPreview";
import AppHeader from "../components/Header";
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
      TripPreview,
      AppHeader
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_AllTrips.scss";
</style>

