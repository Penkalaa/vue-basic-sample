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
              <a>{{ $t("header__homepage") }}</a>
            </li>
            <li tabindex="0">
              <a>{{ $t("header__contactus") }}</a>
            </li>
            <li tabindex="0">
              <a @click="loginPopup()">{{ $t("header__login") }}</a>
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
          <li @click="toggleMenubtn()" tabindex="0">Sign In</li>
          <li @click="toggleMenubtn()" tabindex="0"><a>Home</a></li>
          <li @click="toggleMenubtn()" tabindex="0"><a>Features</a></li>
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
    };
  },
  computed:{
      ...mapGetters(['LOGIN_POPUP_ACTIVE'])
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
    loginPopup(){
        this.$store.commit('SET_LOGIN_POPUP_ACTIVE', true)
    }
  },
};
</script>

<style>
</style>


