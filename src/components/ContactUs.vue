<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 offset-sm-2">
          <div class="px-5">
            <h2>Contact Us</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="title">{{$t("login__Title")}}</label>
                <input
                  type="text"
                  v-model="contact.title"
                  id="title"
                  name="title"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.title.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.contact.title.required"
                  class="invalid-feedback"
                >
                  {{ $t('errors__Title is required')}}
                </div>
              </div>
              <div class="form-group">
                <label for="firstName">{{$t("login__First Name")}}</label>
                <input
                  type="text"
                  v-model="contact.firstName"
                  id="firstName"
                  name="firstName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.firstName.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.contact.firstName.required"
                  class="invalid-feedback"
                >
                  {{ $t('errors__First Name is required')}}
                </div>
              </div>
              <div class="form-group">
                <label for="lastName">{{$t("login__Last Name")}}</label>
                <input
                  type="text"
                  v-model="contact.lastName"
                  id="lastName"
                  name="lastName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.lastName.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.contact.lastName.required"
                  class="invalid-feedback"
                >
                  {{ $t('errors__Last Name is required')}}
                </div>
              </div>
              <div class="form-group">
                <label for="email">{{$t("login__Email")}}</label>
                <input
                  type="email"
                  v-model="contact.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.email.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.contact.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.contact.email.required"
                    >{{ $t('errors__Email is required')}}</span
                  >
                  <span v-if="!$v.contact.email.email">{{ $t('errors__Email is invalid')}}</span>
                </div>
              </div>
              <div class="form-group">
                <label for="phone">{{$t("login__Phone")}}</label>
                <input
                  type="text"
                  v-model="contact.phone"
                  id="phone"
                  name="phone"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.phone.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.contact.phone.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.contact.phone.required"
                    >{{ $t('errors__Phone is required')}}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="country">{{$t("login__Country")}}</label>
                <select
                  v-model="contact.country"
                  id="country"
                  name="country"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.country.$error,
                  }"
                >
                  <option selected disabled>{{$t("login__Select Country")}}</option>
                  <option
                    v-for="item in this.countryList"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <div
                  v-if="submitted && $v.contact.country.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.contact.country.required"
                    >{{ $t('errors__Country is required')}}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="textField">{{$t("login__Text Field")}}</label>
                <textarea
                  type="text"
                  v-model="contact.textField"
                  id="textField"
                  name="textField"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.contact.textField.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.contact.textField.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.contact.textField.required"
                    >{{ $t('errors__TextField is required')}}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary">{{$t("login__Register")}}</button>
              </div>
            </form>

            <div v-if="this.successMessage" class="success-text">
              <h3>{{ this.successMessage }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {
      contact: {
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        textField: "",
      },
      submitted: false,
      successMessage: "",
      countryList: [
        { id: "TR", name: "Turkey" },
        { id: "US", name: "United States of America" },
        { id: "GB", name: "United Kingdom" },
        { id: "DE", name: "Germany" },
        { id: "SE", name: "Sweden" },
        { id: "KE", name: "Kenya" },
        { id: "BR", name: "Brazil" },
        { id: "ZW", name: "Zimbabwe" },
      ],
    };
  },
   computed:{
      ...mapGetters(["USER_INFO"])
  },
  validations: {
    contact: {
      title: { required },
      firstName: { required },
      lastName: { required },
      email: { required, email },
      phone: { required },
      country: { required },
      textField: { required },
    },
  },
  watch:{
      USER_INFO(item){
          this.contact.firstName = item.firstName
          this.contact.lastName = item.lastName
          this.contact.email = item.email
      }
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store
        .dispatch("CONTACT_US_SUBMIT", this.contact)
        .then((success) => {
          this.successMessage = this.$t("contactus__Bize ulaştığınız için teşekkürler");
          setTimeout(function () {
            this.successMessage = "";
          }, 1500);
        });
    },
  },
  created(){
      this.contact.firstName = this.USER_INFO.firstName
          this.contact.lastName = this.USER_INFO.lastName
          this.contact.email = this.USER_INFO.email
  }
};
</script>