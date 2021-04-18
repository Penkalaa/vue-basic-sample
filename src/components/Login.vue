<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" >
        <div class="modal-container" @click.stop>
          <div class="top-line">
            <span class="icon-cross" @click="setPopup()">x</span>
          </div>
          <div>
            <h4>Kayıt Olmak için ilgili alanları doldurunuz</h4>
          </div>
          <div>
              <input type="text" v-model="nameSurname" placeholder="Name Surname">
              <input type="text" v-model="email" placeholder="Email">
              <input type="text" v-model="password" placeholder="Password">
              <input type="text" v-model="repeatPassword" placeholder="Repeat Password">
          </div>
          <div>
              <button @click="setUserInfo()">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["LOGIN_POPUP_ACTIVE","USER_INFO"]),
  },
  data(){
      return{
          nameSurname:'',
          email:'',
          password:'',
          repeatPassword:'',
      }
  },
  methods: {
    setPopup() {
      this.$store.commit("SET_LOGIN_POPUP_ACTIVE", false);
    },
    setUserInfo(){
        let userInfo = {
            nameSurname : this.nameSurname,
            email : this.email,
            password : this.repeatPassword,
            id:"id" + (new Date()).getTime()
        }
        this.$store.commit('SET_USER_INFO', userInfo)
        console.log(this.USER_INFO)
    }
  },
};
</script>