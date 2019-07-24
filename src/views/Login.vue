<template>
  <section class="login">
    <h2>login</h2>
    <form @submit.prevent="login">
      <input type="email" placeholder="Enter Email" minlength="3" v-model="user.email" required autofocus>
      <input type="password" placeholder="Enter Password" minlength="2" v-model="user.pass" required>
      <button>Login</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {email: '', pass: ''},
      loggedInUser: null
    };
  },
  methods:{
    async login(){
      // loading.io
      try{
        await this.$store.dispatch({type: 'login', user:this.user})
          this.user = {email: '', pass: ''}
          this.$router.push('/')
      }catch(err){
        console.log(err);
        // swal
      }
    }
  }
};
</script>


<style lang="scss" scoped>
input,button{
    background-color: white;
    padding: 5px;
    border: black 1px solid;
}
</style>
