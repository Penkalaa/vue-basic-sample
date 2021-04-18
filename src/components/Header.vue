<template>
  <nav id="navigation-top">
    <Login v-if="LOGIN_POPUP_ACTIVE"/>
    <div class="container">
      <div class="row nav-top">
        <div class="logo" tabindex="0">
          <a>
            <img class="logo" src="../assets/img/logo.svg" />
          </a>
        </div>
        <div class="navigation">
          <ul>
            <li tabindex="0">
              <router-link to="/">{{ $t("header__homepage") }}</router-link>
            </li>
            <li tabindex="0">
              <router-link to="/contact-us">{{ $t("header__contactus") }}</router-link>
            </li>
            <li tabindex="0">
              <div v-if="USER_INFO.length == 0" class="login-btn" @click="loginPopup()">{{ $t("header__login") }}</div>
              <template v-if="USER_INFO.firstName">
                <div class="user" >
                  <div class="text">{{ USER_INFO.firstName + " " + USER_INFO.lastName }}</div>
                  <div class="group-logout">
                    <span class="mail">{{USER_INFO.email}}</span>
                    <button class="btn btn-danger" @click="logout()">{{$t('header__logout')}}</button>
                  </div>
                </div>
              </template>
              
            </li>
            <li tabindex="0">
              <select v-model="selectedLang" @change="changeLang()">
                <option :value="'tr'">TR</option>
                <option :value="'en'">EN</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div class="navigation-mobile">
        <a class="logo">
          <img src="../assets/img/logo.svg" />
        </a>
        <input
          class="menu-btn"
          type="checkbox"
          v-model="checked"
          id="menu-btn"
        />
        <label class="menu-icon" for="menu-btn"
          ><span class="navicon"></span
        ></label>
        <ul class="menu">
          <li  tabindex="0">
            <div v-if="!USER_INFO.firstName" class="login-btn" @click="loginPopup() && toggleMenubtn()">{{ $t("header__login") }}</div>
              <template v-if="USER_INFO.firstName">
                <div class="user" >
                  <div class="text" @click="toggleLogout()">{{ USER_INFO.firstName + " " + USER_INFO.lastName }}</div>
                  <div class="group-logout" :class="{active : toggleLog}">
                    <span class="mail">{{USER_INFO.email}}</span>
                    <button class="btn btn-danger" @click="logout()">{{$t('header__logout')}}</button>
                  </div>
                </div>
              </template>
          </li>
          <li @click="toggleMenubtn()" tabindex="0"><router-link to="/contact-us">{{ $t("header__contactus") }}</router-link></li>
          <li @click="toggleMenubtn()" tabindex="0"><router-link to="/">{{ $t("header__homepage") }}</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import i18next from "i18next";
import { mapGetters } from "vuex";
import Login from "../components/Login";

export default {
  components: {
    Login,
  },
  data() {
    return {
      selectedLang: "tr",
      checked: false,
      toggleLog:false
    };
  },
  computed:{
      ...mapGetters(['LOGIN_POPUP_ACTIVE',"USER_INFO"])
  },
  methods: {
    changeLang() {
      i18next.changeLanguage(this.selectedLang);
    },
    toggleMenubtn() {
      if (this.checked == true) {
        this.checked = !this.checked;
      }
    },
    toggleLogout(){
      this.toggleLog = !this.toggleLog
    },
    loginPopup(){
        this.$store.commit('SET_LOGIN_POPUP_ACTIVE', true)
    },
    logout(){
      this.$store.commit("SET_USER_INFO" , [])
    }
  },
  watch:{
    USER_INFO(item){
      if(item.name){

      }
    }
  }
};
</script>

<style>
</style>


