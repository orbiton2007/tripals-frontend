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
      <p>Or Biton ,  , Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde exercitationem adipisci, architecto rem repellat accusantium ratione quidem voluptas vitae dignissimos
         autem aliquid alias consequatur dolores, nostrum suscipit sequi iusto perspiciatis?</p>
       <a class="linkdin"  href="https://www.linkedin.com/in/or-biton-024b3018a/">
       <i class="fab fa-linkedin"></i>
      </a>
    </div>
      <div class="about-item">
      <img src="../assets/img/about/ran1.png" alt="Alex Yeruhin">
      <h1>Ran Albagli</h1>
      <p>
        Ran Albagli, 29 , Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde exercitationem adipisci, architecto rem repellat accusantium ratione quidem voluptas vitae dignissimos
         autem aliquid alias consequatur dolores, nostrum suscipit sequi iusto perspiciatis?
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

