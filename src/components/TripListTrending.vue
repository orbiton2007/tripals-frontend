<template>
  <section class="trip-list">
    <ul class="ul-list">
      <TripPreview v-for="(trip, i) in trips.slice(0,4)" :trip="trip" :key="i" />
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
    // tripsToShow() {
    //     window.onresize = () => {
    //     this.windowWidth = window.innerWidth;
    //     console.log(this.windowWidth);
    //     }
    //     if(this.windowWidth>1200) 
    //     return this.trips.slice(0,4) 
    //     else if(this.windowWidth<=1200) 
    //     return this.trips.slice(0,3) 
        // else if(this.windowWidth<=900) 
        // return this.trips.slice(0,2) 
    //      window.onresize = () => {
    //   this.windowWidth = window.innerWidth;
    //   if(this.windowWidth<1100){
    //     this.swiperOption.slidesPerView=2
    //   }
    // }
    // }
  },
  components: {
    TripPreview
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_TripList.scss";
</style>