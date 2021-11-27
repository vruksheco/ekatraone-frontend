<template>
  <q-page class="row">
    <div class="desktop-only mobile-hide bg-primary col">
      <div class="text-center col" style="top: 30%; position: relative;">
        <img src="https://indus-6c25e.web.app/static/media/hero.9c841f6f.svg" />
      </div>
    </div>
    <div class="col desktop-only">
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn
          color="primary"
          @click="create = !create"
          class="q-btn1 q-pa-sm text-white"
        >Create Account</q-btn>
      </q-page-sticky>
      <q-dialog v-model="create" persistent maximized transition-show="fade" transition-hide="fade">
        <q-card class="bg-primary text-white">
          <q-btn dense class="float-right" flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <div class="absolute-center">
            <q-form @submit.prevent="signup">
              <q-card-actions
                style="height:70px;border-radius: 16px;max-width: 460px;padding:0px 16px 0px;"
                class="q-pa-md bg-white"
              >
                <q-input
                  ref="name"
                  clearable
                  borderless
                  style="padding-top:8px; width:460px;"
                  v-model="register.name"
                  label="Name"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please enter your name']"
                >
                  <template v-slot:prepend>
                    <q-icon
                      class="q-pl-md"
                      size="27px"
                      color="secondary"
                      name="eva-person-outline"
                    />
                  </template>
                </q-input>
              </q-card-actions>

              <q-card-actions
                style="height:70px;border-radius: 16px;max-width: 460px;padding:0px 16px 0px; margin-top:25px"
                class="q-pa-md bg-white"
              >
                <q-input
                  ref="reg"
                  borderless
                  v-model="register.email"
                  color="primary"
                  clearable
                  style="padding-top:8px; width:460px;"
                  label="Email"
                  error-message="Please enter a valid email-id"
                  :rules="[val => !!val, isValidEmail]"
                >
                  <template v-slot:prepend>
                    <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-email-outline" />
                  </template>
                </q-input>
              </q-card-actions>
              <q-card-actions
                style="height:70px;border-radius: 16px;max-width: 460px;padding:0px 16px 0px; margin-top:25px"
                class="q-pa-md bg-white"
              >
                <q-input
                 clearable
                 borderless
                  style="padding-top:8px; width:460px;"
                  v-model="register.contact"
                  color="primary"
                  label="Contact"
                  lazy-rules
                  :rules="[ val => val && val.length > 8 || 'Please enter your number']"
                >
                  <template v-slot:prepend>
                    <q-icon
                      class="q-pl-md"
                      size="27px"
                      color="secondary"
                      name="eva-smartphone-outline"
                    />
                  </template>
                </q-input>
              </q-card-actions>
             <q-card-actions
                style="height:70px;border-radius: 16px;max-width: 460px;padding:0px 16px 0px; margin-top:25px"
                class="q-pa-md bg-white"
              >
                <q-input
                  borderless
                  v-model="register.password"
                  color="primary"
                  style="padding-top:8px; width:460px;"
                  :type="isPwd ? 'password' : 'text'"
                  autocomplete="on"
                  label="Password"
                >
                  <template v-slot:prepend>
                    <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-lock-outline" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer q-pr-md"
                      @click="isPwd = !isPwd"
                    ></q-icon>
                  </template>
                </q-input>
             </q-card-actions>
              <q-btn
                type="submit"
                style="width: 460px;margin-top:25px"
                class="q-btn1 bg-white text-primary text-h6"
              >Register</q-btn>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
      <div flat class="fixed-center" style="top: 50%; position: relative; width: 400px ">
        <h3 class="text-primary text-center">Ēkatra</h3>
        <div class="text-h4">Login to your account!</div>
        <div class="text-grey">Please enter your login details</div>
        <q-form class="login" @submit.prevent="login">
          <q-card-actions align="center" style="width: 460px;" class="row q-mb-md q-pt-lg">
            <q-input
              ref="login"
              outlined
              v-model="user.email"
              color="primary"
              style="border-radius: 16px"
              class="col"
              label="Email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter your email']"
            >
              <template v-slot:prepend>
                <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-email-outline" />
              </template>
            </q-input>
          </q-card-actions>
          <q-card-actions align="center" style="width: 460px;" class="row q-mb-md">
            <q-input
              ref="password"
              outlined
              v-model="user.password"
              color="primary"
              style="border-radius: 16px"
              class="col"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="on"
              label="Password"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please enter your password']"
            >
              <template v-slot:prepend>
                <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-lock-outline" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer q-pr-md"
                  @click="isPwd = !isPwd"
                ></q-icon>
              </template>
            </q-input>
          </q-card-actions>

          <q-btn
            :disabled="loading"
            color="primary"
            type="submit"
            style="width: 460px;"
            class="q-btn1 text-h6"
          >
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>Login
          </q-btn>
        </q-form>
        <q-btn
          flat
          lowercase
          style="width:460px; margin-top:7%;"
          @click="forgot = !forgot"
          class="text-weight-light text-black text-lowercase"
        >Forgot Password</q-btn>
      </div>
    </div>
    <q-card flat class="mobile-only q-px-xl fixed-center">
      <h3 class="text-primary text-center">Ēkatra</h3>
      <div class="text-h4">Login to your account!</div>
      <div class="text-grey">Please enter your login details</div>
      <q-form class="login row" @submit.prevent="login">
        <q-card-section
          align="center"
          style="min-width: 350px;"
          class="row q-mb-md q-pt-lg q-pa-none"
        >
          <q-input
            ref="login"
            outlined
            v-model="user.email"
            color="primary"
            style="border-radius: 16px"
            class="col"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter your email']"
          >
            <template v-slot:prepend>
              <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-email-outline" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section align="center" style="min-width: 350px;" class="row q-mb-md q-pa-none">
          <q-input
            ref="password"
            outlined
            v-model="user.password"
            color="primary"
            style="border-radius: 16px"
            class="col"
            :type="isPwd ? 'password' : 'text'"
            autocomplete="on"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please enter your password']"
          >
            <template v-slot:prepend>
              <q-icon class="q-pl-md" size="27px" color="secondary" name="eva-lock-outline" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pr-md"
                @click="isPwd = !isPwd"
              ></q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-btn :disabled="loading" color="primary" type="submit" class="full-width q-btn1 text-h6">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>Login
        </q-btn>
        <q-btn
          flat
          lowercase
          style="margin-top:7%;"
          @click="forgot = !forgot"
          class="full-width text-weight-light text-black text-lowercase"
        >Forgot Password</q-btn>
        <q-dialog
          v-model="forgot"
          persistent
          maximized
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card class="bg-primary text-white">
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            <div class="fixed-center">
              <q-card-section>
                <div class="text-center text-h6">Forgot your password?</div>
              </q-card-section>

              <q-card-section>
                <div style="width: 350px;" class="row q-pt-lg">
                  <q-input
                    borderless
                    v-model="forgotPass"
                    style="border-radius: 16px"
                    class="bg-white col"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        class="q-pl-md"
                        size="27px"
                        color="secondary"
                        name="eva-person-outline"
                      />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  type="submit"
                  @click="forgotPassword"
                  style="width: 350px;margin-top:10%"
                  class="row q-btn1 bg-white text-primary text-h6"
                >Send</q-btn>
              </q-card-section>
            </div>
          </q-card>
        </q-dialog>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import User from "../models/user";
import auth from "../services/Auth";
export default {
  user: new User("", ""),

  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      dense: false,
      isPwd: true,
      create: false,
      forgot: false,
      forgotPass: "",
      message: "",
      register: {
        email: "",
        password: "",
        name: "",
        contact: ""
      },
      formData: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/page");
    }
  },

  methods: {
    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val);
    },
    async signup() {
      this.$refs.reg.validate();
      this.$refs.name.validate();

      try {
        const credentials = {
          name: this.register.name,
          email: this.register.email,
          contact: this.register.contact,
          password: this.register.password
        };
        const response = await auth.signup(credentials);
        this.message = response.message;
        location.href = "/";
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },
    async forgotPassword() {
      try {
        const credentials = {
          email: this.forgotPass
        };
        const response = await auth.forgotPassword(credentials);
        this.message = response.message;
        location.href = "/";
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },

    login() {
      this.loading = true;
      this.$refs.login.validate();
      this.$refs.password.validate();

      if (this.$refs.login.hasError || this.$refs.password.hasError) {
        this.formHasError = true;
      }

      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/page");
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.$q.notify(this.message);
          }
        );
      }
    }
    // signup() {
    //   this.message = '';
    //   this.$store.dispatch('auth/signup', this.user).then(
    //         data => {
    //           this.message = data.message;
    //         },
    //         error => {
    //           this.message =
    //             (error.response && error.response.data) ||
    //             error.message ||
    //             error.toString();

    //         }
    //       );

    // }
  }
};
</script>

<style lang="scss">
.q-btn1:hover {
  transform: scale(1.1, 1.1);
}
</style>
