<template>
  <section>

  <section class="about">
    <Login v-if="loginModal" />
    <Header class="colorBg" />
  </section>

  <section  class="about-page-wrapper" > 
     <div class="about-item">
      <a href="https:/eitan02581.github.io/portofolio/">
        <img src="../assets/img/about/or1.png" alt>
      </a>
      <h1>Or Biton</h1>
      <p>Hi, i'm Or, 27 years old, a junior full stack web deveoloper. Just finished the Coding Academy bootcamp and also got BEd in Mathematics Teacher Education from Gordon College of Education. looking for my next challenge</p>
       <a class="linkdin"  href="https://www.linkedin.com/in/or-biton-024b3018a/">
       <i class="fab fa-linkedin"></i>
      </a>
    </div>
      <div class="about-item">
      <img src="../assets/img/about/ran1.png" alt="Alex Yeruhin">
      <h1>Ran Albagli</h1>
      <p>
       Hi, i'm Ran, 29 years old, a junior full stack web deveoloper. Just finished the Coding Academy bootcamp and also got B.Sc in Computer Science from Holon Institute of Technology. looking for my next challenge
        </p>
       <a class="linkdin"  href="https://www.linkedin.com/in/ran-albagli-05276518a/">
       <i class="fab fa-linkedin"></i>
      </a>
    </div>
  </section>
  </section>
</template>

<script>
import Header from "../components/Header";
import Login from "../components/Login";
export default {
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    }
  },
  components: {
    Header,
    Login,
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/views/_About.scss";

</style>

