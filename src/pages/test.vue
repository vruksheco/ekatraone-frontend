<template>
  <q-page>
    <div v-if="showGroup">
      <q-card-actions>
        <q-space />
        <div class="text-h6"></div>

        <q-btn @click="addGroupDialog = true" color="primary" no-caps label="Schedule Course" />
      </q-card-actions>
      <q-dialog class="q-pa-md" v-model="addGroupDialog">
        <q-card class="q-pa-lg">
          <q-card-section class="text-h6">Assign a course to Group</q-card-section>
          <q-card-section>
            <q-form>
              <q-select
                style="padding:0% 3% 0% 10%"
                v-model="model"
                :options="course"
                :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                label="Select course"
              />
              <q-select
                style="padding:10% 3% 0% 10%"
                v-model="model1"
                :options="group"
                :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
                label="Select Group"
              />

              <div style="padding:15% 0% 0% 0%">Use previously created course to assign!</div>
              <q-input style="padding:10% 0% 0% 0%" v-model="date">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-card-actions class="q-pt-md" align="right">
                <q-btn
                  style="margin-top:15px"
                  filled
                  color="primary"
                  label="Assign"
                  @click="scheduleCourse(model1.id,model.id)"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <div v-if="spin" class="q-pt-md absolute-center">
        <q-spinner-cube color="primary" size="5em" />
      </div>

      <div v-else class="q-pa-md row items-start q-gutter-md">
        <q-card
          v-for="(c_name,index) in delivery"
          :key="c_name.id"
          class="my-card bg-secondary text-white"
        >
          <q-card-section>
            <div class="row items-start example-container">
              <div class="example-cell col-6 text-h6" tabindex="0">{{c_name.course_name}}</div>
              <div
                style="padding-top:4px; font-size:16px"
                class="example-cell"
                tabindex="0"
              >({{c_name.status}})</div>
              <div
                style="padding-top:10px;"
                class="text-subtitle2"
              >Group Name: {{c_name.group_name}}</div>
            </div>
          </q-card-section>

          <q-card-actions style="padding-left:20px">
            <q-btn
              v-if="c_name.status === 'SCHEDULED'"
              :disabled="hide_pause"
              @click="pause(c_name.id)"
              flat
              round
              color="white"
              icon="pause"
            >
              <span v-show="hide_pause" class="spinner-border spinner-border-sm"></span>
              <q-tooltip content-class="bg-primary text-white">Pause</q-tooltip>
            </q-btn>
            <q-btn
              v-if="c_name.status === 'PAUSED'"
              :disabled="hide_play"
              @click="restart(c_name.id)"
              flat
              round
              color="white"
              icon="play_arrow"
            >
              <span v-show="hide_play" class="spinner-border spinner-border-sm"></span>
              <q-tooltip content-class="bg-primary text-white">Play</q-tooltip>
            </q-btn>
            <q-btn
              v-if="c_name.status === 'NOT_SCHEDULED'"
              :disabled="hide_play"
              @click="restart(c_name.id)"
              flat
              round
              color="white"
              icon="play_arrow"
            >
              <span v-show="hide_stop" class="spinner-border spinner-border-sm"></span>
              <q-tooltip content-class="bg-primary text-white">Play</q-tooltip>
            </q-btn>
            <q-btn
              :disabled="hide_stop"
              @click="stop(c_name.id)"
              flat
              round
              color="white"
              icon="stop"
            >
              <span v-show="hide_stop" class="spinner-border spinner-border-sm"></span>
              <q-tooltip content-class="bg-primary text-white">Stop</q-tooltip>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md" style="max-width: 300px"></div>
  </q-page>
</template>

<script>
import UserService from "../services/user.service";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      date: "Date and Time",
      addUserDropdown: "",
      addGroupDialog: false,
      addUserDialog: false,
      hide_pause: false,
      hide_play: false,
      hide_stop: false,
      showGroup: true,
      alert: false,
      update: false,
      spin:true,
      model: null,
      model1: null,
      course: [],
      group: [],
      delivery: [],
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"]
    };
  },

  mounted() {
    UserService.getCourse().then(
      response => {
        this.course = response.data.courses;
        //this.content = response.data.courses[0].name;
        this.item = response.data.course;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    UserService.getGroup().then(
      response => {
        this.group = response.data.groups;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );

    UserService.getDelivery().then(
      response => {
        this.delivery = response.data.deliveries;
        this.spin=false
      },

      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    async scheduleCourse(g_id, c_id) {
      console.log(g_id, c_id);
      try {
        const details = {
          schedule_at: this.date
        };
        await UserService.scheduleCourse(g_id, c_id, details);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },
    async pause(id) {
      try {
        await UserService.pause(id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },
    async restart(id) {
      try {
        await UserService.restart(id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },
    async stop(id) {
      try {
        await UserService.stop(id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>