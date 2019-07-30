<template>
  <li class="member-container" v-if="user">
    <div class="flex column">
      <img class="user-img" @click="goUserProfile" :src="user.imgUrl" />
      <div>
        <h4 class="name">{{user.firstName}} {{user.lastName}}</h4>
      </div>
    </div>
  </li>
</template>


<script>
export default {
  props: {
    userId: Object
  },
  data() {
    return {
      user: null
    };
  },
  async created() {
    try {
      this.user = await this.$store.dispatch({
        type: "getUserById",
        id: this.userId.userId
      });
    } catch (err) {
      console.log('unknown',err);
      
    }
  },
  computed: {},
  methods: {
    goUserProfile() {
      this.$router.push(`/UserProfile/${this.user._id}`);
    },
  }
};
</script>


<style lang="scss" scoped>
@import "../styles/components/_Participants.scss";
</style>
