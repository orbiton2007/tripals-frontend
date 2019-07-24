<template>
  <div>
    <vue-google-autocomplete
      ref="address"
      id="map"
      class="autocomplete-search"
      placeholder
      v-on:placechanged="getAddressData"
      types="(cities)"
    ></vue-google-autocomplete>
  </div>
</template>
 
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  components: { VueGoogleAutocomplete },

  data: function() {
    return {
      address: ""
    };
  },

  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  },

  methods: {
    // /**
    // * When the location found
    // * @param {Object} addressData Data of the found location
    // * @param {Object} placeResultData PlaceResult object
    // * @param {String} id Input container ID
    // */
    getAddressData: function(addressData) {
      
      this.address = addressData;

      this.$emit("placeSelected", this.address);
      // function(addressData, placeResultData, id) 
    }
  }
};
</script> 
<style lang="scss" scoped>
@import "../styles/views/_TripEdit.scss";
</style>