<template>
  <section v-if="tripsToShow" class="trip-list">
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in tripsToShow" :trip="trip" :key="i" />
    </ul>
  </section>
</template>

<script>
import TripPreview from "./TripPreview";
export default {
  props: {
    trips: Array
  },
  data() {
    return {
      windowWidth: null
    };
  },
  computed: {
    tripsToShow() {
      window.onresize = () => {
        this.windowWidth = window.innerWidth;
        console.log(this.windowWidth);
      };
      if (this.windowWidth > 1600) return this.trips.slice(0, 5);
      else if (this.windowWidth < 1600) return this.trips.slice(0, 4);
    }
  },
  components: {
    TripPreview
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_TripList.scss";
</style>