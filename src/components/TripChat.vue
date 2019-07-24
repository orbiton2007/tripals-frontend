<template>
  <section v-if="chat && trip" class="trip-chat">
    <div class="div-btn-close">
      <i class="material-icons btn-close" @click="closeChat">close</i>
    </div>
    <div ref="msg" class="group-chat">
      <ul v-if="loggedInUser">
        <li v-for="(msg, i) in chat.msgs" :key="i">
          {{msg.from}}:&nbsp; {{msg.txt}} &nbsp;&nbsp;
          <span class="msg-date">{{ msg.createdAt | moment("h:mm a") }}</span>
        </li>
        <li v-if="typingMsg">{{typingMsg.from}} {{typingMsg.txt}}</li>
      </ul>
    </div>

    <form @submit.prevent="sendMsg" class="new-msg-area flex">
      <input
        @input="sendTyping"
        @keyup="stopTyping"
        type="text"
        class="new-msg-input"
        :placeholder="placeholder"
        :disabled="!loggedInUser"
        v-model="msg"
      />
      <i class="material-icons" :disabled="!loggedInUser" type="submit">send</i>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    trip: Object
  },
  data() {
    return {
      msg: "",
      chat: null,
      // isTyping: false,
      timeOut: ""
    };
  },
  async created() {
    try {
      this.chat = await this.$store.dispatch({
        type: "getChat",
        id: this.trip.chat._id
      });
      this.$store.dispatch({
        type: "chatJoin",
        chat: this.chat,
        user: this.loggedInUser
      });
    } catch (err) {
      console.log("cant get the chat", err);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    placeholder() {
      if (!this.loggedInUser)
        return "Connect and start chatting with the group members";
      else return "Type a message...";
    },
    typingMsg() {
      return this.$store.getters.typingMsg;
    }
  },
  methods: {
    sendMsg() {
      this.$store.dispatch({
        type: "sendMsg",
        chat: this.chat,
        user: this.loggedInUser,
        msg: this.msg
      });
      this.$refs.msg.scrollTop = this.$refs.msg.scrollHeight;
      this.msg = "";
    },
    async sendTyping() {
      // this.isTyping = true;
      clearTimeout(this.timeOut);
      // if (this.isTyping) {
      await this.$store.dispatch({
        type: "sendTyping",
        chat: this.chat,
        user: this.loggedInUser
      });
      this.$refs.msg.scrollTop = this.$refs.msg.scrollHeight;
      // }
    },
    stopTyping() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(async () => {
        this.isTyping = false;
        await this.$store.dispatch({
          type: "stopTyping",
          chat: this.chat,
          user: this.loggedInUser
        });
      }, 1000);
    },
    closeChat() {
      this.$emit("closeChat");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_TripChat";
</style>