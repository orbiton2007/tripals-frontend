<template>
  <section class="trip-filter">
    <form @submit.prevent="setFilter">
      <div class="flex-container">
        

        <div class="flex-item destination-container">
          <h5>Destination</h5>
          <v-text-field
            solo
            slot="activator"
            v-model="filter.destination"
            @input="setFilter"
            label="Where do we want to go?"
            prepend-inner-icon="place"
            flat
          ></v-text-field>
        </div>

        <div class="flex-item from-container">
          <h5>From</h5>
          <v-menu>
            <v-text-field
              solo
              :value="filter.start"
              slot="activator"
              prepend="date-range"
              prepend-inner-icon="calendar_today"
              flat
            ></v-text-field>
            <v-date-picker v-model="filter.start" no-title @input="setFilter"></v-date-picker>
          </v-menu>
        </div>

        <div class="flex-item to-container">
          <h5>Until</h5>
          <v-menu>
            <v-text-field
              solo
              flat
              prepend-inner-icon="calendar_today"
              :value="filter.end"
              slot="activator"
            ></v-text-field>
            <v-date-picker v-model="filter.end" no-title @input="setFilter"></v-date-picker>
          </v-menu>
        </div>

        <div class="flex-item type-container">
          <h5>Trip type</h5>
          <v-select
            @input="setFilter"
            v-model="filter.types"
            :items="items"
            attach
            multiple
            solo
            flat
            small-chips
            dense
            color="#FB601D"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index <= 1">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 1"
                class="grey--text caption"
              >(+{{ filter.types.length - 1 }} others)</span>
            </template>
          </v-select>
        </div>
      </div>
    </form>
  </section>
</template>


<script>
export default {
  data() {
    return {
      filter: {
        destination: "",
        start: null,
        end: null,
        types: []
      },
      items: [
        "Day trip",
        "Culture",
        "Historical",
        "Guided Tour",
        "Cycling",
        "Camping",
        "Hiking",
        "Beach",
        "Motorcycle Tour",
        "Markets",
        "Culinary",
        "Spiritual"
      ]
    };
  },
  created() {},
  computed: {},
  methods: {
    setFilter() {
      console.log(this.filter);

      this.$emit("setFilter", this.filter);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_TripFilter.scss";
</style>
