
<template>
  <section>
   
  </section>
</template>

<script>
import WeatherService from "../Services/WeatherService";
export default {
  async created() {
    const coords = await WeatherService.getCoordsByLocation(this.location);
    const weather = await WeatherService.getWheaterByCoords(coords);
    const shortedWeatherObj= await WeatherService.minimizeWeatherObj(weather)
    this.foreCastweather=shortedWeatherObj
    this.emitWeather()
    
  },
  data() {
    return {
       foreCastweather:{}
    }
  },
  computed:{
  
  },
  props: {
    location: String
  },
  methods:{
    emitWeather(){  
      this.$emit('weather',this.foreCastweather)
    }
  }
}
</script>





