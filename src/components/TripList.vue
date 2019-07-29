<template>
  <div>
    <div>
      <swiper :options="swiperOption">
        <TripPreview v-for="(trip, i) in trips" :key="i" :trip="trip" />
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>


<script>
import TripPreview from "./TripPreview";
import { swiper } from "vue-awesome-swiper";
export default {
  props: {
    trips: Array
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        // init: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          }
          // 400: {
          //   slidesPerView: 1,
          //   spaceBetween: 10
          // }
        }
      }
    };
  },
  components: {
    TripPreview,
    swiper
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_OwnerTripsList.scss";
</style>

