<template>
  <q-page class="q-pa-xl">
    <div
       class="q-pa-md row items-start q-gutter-md" 
    >
      <q-card class="my-card text-white" style="background-color:#288B49">
        <q-card-section>
          <div class="text-h6">Total No. of Courses</div>
          <div style="margin-left:20px" class="circle float-right">
            <div class="circle__inner">
              <div class="circle__wrapper">
                <div class="circle__content">{{course}}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <span class="text-body2 text-bold">Updated at {{course_time}}</span>
        </q-card-section>
      </q-card>
      <q-card class="my-card text-white" style="background-color: #288B49">
        <q-card-section>
          <div class="text-h6">Total number Users</div>
          <div style="margin-left:20px" class="circle float-right">
            <div class="circle__inner">
              <div class="circle__wrapper">
                <div class="circle__content">{{users}}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <span class="text-body2 text-bold">Updated at {{student_time}}</span>
        </q-card-section>
      </q-card>
      <q-card class="my-card text-white" style="background-color: #288B49">
        <q-card-section>
          <div class="text-h6">Total Groups</div>
          <div style="margin-left:20px" class="circle float-right">
            <div class="circle__inner">
              <div class="circle__wrapper">
                <div class="circle__content">{{group}}</div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <span class="text-body2 text-bold">Updated at {{group_time}}</span>
        </q-card-section>
      </q-card>
      
    </div>

    <div class="row q-gutter-xl q-pa-lg">
      <q-card
        v-for="block in blocks"
        :key="block.label"
        class="col-3 q-pa-md"
        style="min-width:150px;"
      >
        <span class="text-h5">{{ block.heading }}</span>
        <img style class="q-pa-xl" :src="block.image" />
        <q-btn
          class="absolute-bottom-right q-mr-md q-mb-md"
          color="primary"
          :label="block.label"
          :to="block.to"
          :v-html="block.action"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import UserService from "../services/user.service";
import Chart from "chart.js";
import data from "../components/chart1.js";
import data1 from "../components/chart2.js";

export default {
  data() {
    return {
      data: data,
      day: "",
      email :"xyz@something.com",
      dash: [],
      data1: data1,
      course_time:"00:00:00",
      group_time:"00:00:00",
      student_time:"00:00:00",
      course:0,
      users:0,
      group:0,
      
      blocks: [
        {
          heading: "Create Course",
          image: "https://bit.ly/3oDEMII",
          label: "create course",
          to: "/builder"
        },
        {
          heading: "Grivence",
          image: "https://bit.ly/3eirblD",
          label: "grivence",
          to: "",
        },
        {
          heading: "Support",
          image: "https://bit.ly/35IOCAv",
          label: "feedback",
          to: "mailto: name@gmail.com"
        }
      ]
    };
  },
  mounted() {

    UserService.dashboard().then(
      response => {
        this.course = response.data.Total_no_of_courses;
        this.users = response.data.Total_no_of_users;
        this.group = response.data.Total_groups;
        this.course_time=response.data.Last_updated_course;
        this.group_time=response.data.Last_updated_group;
        this.student_time=response.data.Last_updated_student;
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
  },
  beforeMount() {
    // this.test();
  }
};
</script>

<style>
.q-btn:hover {
  transform: scale(1.1, 1.1);
}
.tile {
  border-left: 4px solid #008575;
  background-color: #e4e3d9;
}
.tile:hover {
  transform: scale(1.1, 1.1);
  border-left: 4px solid #008575;
}
</style>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 320px
.card
  margin-top: 7%
  width: 40%
</style>
<style >
.circle {
  position: relative;
  display: block;
  margin: 1em 0;
  background-color: transparent;
  color: #222;
  text-align: center;
  width: 20%;
  margin-top: -5%;
}

.circle:after {
  display: block;
  padding-bottom: 100%;
  width: 100%;
  height: 0;
  border-radius: 50%;
  background-image: radial-gradient(
    circle 827px at 47.3% 48%,
    rgba(255, 255, 255, 1) 0%,
    rgba(138, 192, 216, 1) 90%
  );
  content: "";
}

.circle__inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.circle__wrapper {
  display: table;
  width: 100%;
  height: 100%;
}

.circle__content {
  display: table-cell;
  vertical-align: middle;
  font-size: 20px;
}
</style>