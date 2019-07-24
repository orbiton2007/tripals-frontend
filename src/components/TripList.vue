 
 

<template>
   <section class="trip-list">
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in trips" :trip="trip" :key="i" />
    </ul>
  </section> 


</template>


<script>
import TripPreview from "./TripPreview";
// import { Carousel, Slide } from "vue-carousel";
export default {
  props: {
    trips: Array
  },
  components: {
    TripPreview,
    // Carousel,
    // Slide
  },
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_TripList.scss";
</style>

