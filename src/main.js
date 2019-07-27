import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '../src/styles/application.scss'
import '../src/assets/fonts/streamline-icons/css/style.css'
import * as VueGoogleMaps from "vue2-google-maps";
import VueSweetalert2 from 'vue-sweetalert2';
// import VueCarousel from 'vue-carousel';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

const options = {
  // confirmButtonColor: '#41b882',
  // cancelButtonColor: '#ff7674',
  toast:true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000
}
Vue.use(require('vue-moment'));
Vue.use(VueSweetalert2, options)
// Vue.use(VueCarousel);


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAY3sSuIsbs3ZDKn_2_-xGEJHgOW8Wmrdk",
    libraries: "places" ,// necessary for places input
  }
});

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
