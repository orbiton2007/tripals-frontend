 
 

<template>
   <section class="trip-list">
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in trips" :trip="trip" :key="i" />
    </ul>
  </section> 


</template>


<script>
import TripPreview from "./TripPreview";
export default {
  props: {
    trips: Array
  },
  components: {
    TripPreview,
  },
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_TripList.scss";
</style>

