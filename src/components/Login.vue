<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="top-line">
            <span class="icon-cross" @click="setPopup()">x</span>
          </div>
          <div>
            <h4>{{$t('login__signup')}}</h4>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="firstName">{{$t("login__First Name")}}</label>
              <input
                type="text"
                v-model="user.firstName"
                id="firstName"
                name="firstName"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.user.firstName.$error,
                }"
              />
              <div
                v-if="submitted && !$v.user.firstName.required"
                class="invalid-feedback"
              >
                {{ $t('errors__First Name is required')}}
              </div>
            </div>
            <div class="form-group">
              <label for="lastName">{{$t("login__Last Name")}}</label>
              <input
                type="text"
                v-model="user.lastName"
                id="lastName"
                name="lastName"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.user.lastName.$error,
                }"
              />
              <div
                v-if="submitted && !$v.user.lastName.required"
                class="invalid-feedback"
              >
                {{ $t('errors__Last Name is required')}}
              </div>
            </div>
            <div class="form-group">
              <label for="email">{{$t("login__Email")}}</label>
              <input
                type="email"
                v-model="user.email"
                id="email"
                name="email"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.user.email.$error }"
              />
              <div
                v-if="submitted && $v.user.email.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.email.required">{{ $t('errors__Email is required')}}</span>
                <span v-if="!$v.user.email.email">{{ $t('errors__Email is invalid')}}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="password">{{$t("login__Password")}}</label>
              <input
                type="password"
                v-model="user.password"
                id="password"
                name="password"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.user.password.$error,
                }"
              />
              <div
                v-if="submitted && $v.user.password.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.password.required"
                  >{{ $t('errors__Password is required')}}</span
                >
                <span v-if="!$v.user.password.minLength"
                  >{{ $t('errors__Password must be at least 6 characters')}}</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">{{$t("login__Confirm Password")}}</label>
              <input
                type="password"
                v-model="user.confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                class="form-control"
                :class="{
                  'is-invalid': submitted && $v.user.confirmPassword.$error,
                }"
              />
              <div
                v-if="submitted && $v.user.confirmPassword.$error"
                class="invalid-feedback"
              >
                <span v-if="!$v.user.confirmPassword.required"
                  >{{ $t('errors__Confirm Password is required')}}</span
                >
                <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                  >{{ $t('errors__Passwords must match')}}</span
                >
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary">{{$t("login__Register")}}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  computed: {
    ...mapGetters(["LOGIN_POPUP_ACTIVE", "USER_INFO"]),
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
      successMessage: "",
    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  methods: {
    setPopup() {
      this.$store.commit("SET_LOGIN_POPUP_ACTIVE", false);
    },
    setUserInfo() {
      let userInfo = {
        nameSurname: this.nameSurname,
        email: this.email,
        password: this.repeatPassword,
        id: "id" + new Date().getTime(),
      };
      this.$store.commit("SET_USER_INFO", userInfo);
      console.log(this.USER_INFO);
    },
    handleSubmit(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$store
        .commit("SET_USER_INFO", this.user);
        this.$store.commit("SET_LOGIN_POPUP_ACTIVE", false);
        console.log(this.USER_INFO)
    },
  },
};
</script>