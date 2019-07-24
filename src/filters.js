import Vue from 'vue'
import moment from 'moment'



Vue.filter('timeAgo', ms => {
    return moment(ms).fromNow()
})