<template lang="">
  <!--Course name-->
  <div>
          <q-card-actions>
        <q-space />
      <q-btn
      @click="CreateCourse = true"
      color="primary"
      no-caps
      label="Add New Course"
    />
      </q-card-actions>
          <div  v-if="spin" class="q-pt-md absolute-center">
            <q-spinner-cube
            color="primary"
            size="5em"
      />
    </div>
      <div class="top-left q-pa-md row items-start q-gutter-md">
     <q-card class="my-card" 
      v-for="(task,index) in con" 
      :key="task.id"
      >
      <q-card-section class="bg-grey-8 text-white">
        <div class="text-h6">{{task.name}}</div>
      </q-card-section>

      <q-card-actions vertical align="center">
        <q-btn flat v-on:click="select(task.id)">Update</q-btn>
        
        <q-dialog
        v-if="update==true"
        v-model="update"
      persistent
      maximized
    >
      <q-card class="text-black">
          <q-btn dense @click="clear_days" flat icon="close" v-close-popup>
            <q-tooltip  content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>

        <q-card-section>
          <div class="text-h6">Course Name: {{selectedItem.name}}</div>
        </q-card-section>
                <q-card-section>
          <div class="text-h6">Author: {{selectedItem.author}}</div>
        </q-card-section>

        <q-card class="q-pa-sm q-ma-md bg-grey-3 q-pb-none">
      
      <div style="padding-top:10px" class="col-3 col-sm-6 text-h5">Course Details</div>
      <q-btn  @click="deleteDay(selectedItem.id,selectDay.day)" :disabled="loading" class="col-3 col-sm-6" style="margin-left:95%" push color="red" round icon="delete" />

      <div class="row q-gutter-md q-pa-sm">

      <div class="col-2 bg-white q-pa-sm q-gutter-y-md">

       <q-btn
         v-for="(day,index) in selectedItem.days"
         :key="day.day"
         color="white" 
         text-color="black"
        v-on:click="add(day)"
         >Day {{day.day}}</q-btn>

       <q-btn
         v-for="(day,index) in days"
         :key="day.index"
         color="white" 
         text-color="black"
         v-on:click="add_update(day)"
         >Day {{day.num}}</q-btn>


    <div v-if="alert==false">  
      <q-btn color="primary" size="sm" label="Add Day" 
      @click="addDay" />
    </div>
    <div v-if="alert==true">  
      <q-btn color="primary" @click="updateDay(selectDay.day,selectedItem.id)" size="sm" label="Update day"
       />
    </div>
      </div>

    <div class="col bg-white q-pa-sm q-gutter-md" style="">

    <form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-editor
        ref="editor_ref"
        @paste.native="evt => pasteCapture(evt)"
        v-model="editor"
      />
     </q-btn>
    </form>

   <div class="bg-grey-3 q-pa-md q-gutter-sm">
   Question 1
   <q-input v-model="question" outlined class=""  label="Question"/>
   <q-input v-model="answer" outlined class="" label="Answer"/>
   </div>

      <div v-if="alert==true">  
      <q-btn
       v-for="(question,index) in selectDay.questions"
       :key="question.no"
       color="white" 
       text-color="black" 
       v-on:click="add_ques(question)"
      >Question {{question.question_number}}</q-btn>

      <q-btn
       v-for="(question,index) in day_question"
       :key="question.no"
       color="white" 
       text-color="black" 
       v-on:click="add_ques(question)"
      >Question {{question.no}}</q-btn>
      </div>

    <div v-if="alert==false">  
    <q-btn
       v-for="(question,index) in day_question"
       :key="question.no"
       color="white" 
       text-color="black" 
       v-on:click="add_ques(question)"
      >Question {{question.no}}</q-btn>
    </div>

   <q-btn @click="addQuestions(index)" color="primary" label="Add Question" />

  </div>
      </div>
      </q-card>
        <q-stepper-navigation>
          <q-btn style="margin-left:7%" @click="updateCourse(selectedItem.id)" color="primary" v-close-popup label="submit" />

        </q-stepper-navigation>
              </q-form>
      </q-card>
    </q-dialog>
        <q-btn @click="deletePost(task.id)" flat>Delete</q-btn>
      </q-card-actions>
      </q-item>
    </q-card>
  </div>


  <q-dialog v-model="CreateCourse" class=""  persistent maximized >
    <q-card class="bg-white">
      
      <q-btn @click="clear_days" color="green" dense flat icon="close" v-close-popup>
        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <q-space/>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >

      <q-step
        :name="1"
        title="Add new Course"
        icon="create_new_folder"
        :done="done1"        
      >
      <q-form class="q-pa-md">
      <q-card class="q-pa-sm q-ma-md bg-grey-2">
        <div class="q-pa-md text-h5">Add Course Details</div>
        <div class="q-pa-md q-gutter-y-md">
          <q-input class="row" v-model="course_name" label="Name"/>
          <q-input class="row" v-model="author" label="Author" />
          <q-input
            class="row"
            v-model="description"
            label="Description"
          />
           <q-select  ref="course" v-model="catelist" :options="categeories" label="Category"    
            :rules="[ val => val || 'Please select the category']" />
        </div>
      </q-card>
      <q-card class="q-pa-sm q-ma-md bg-grey-2 q-pb-none">
        <div class="q-pa-md text-h5">Activation Message</div>
        <div class="q-pa-md q-gutter-y-md">
          <q-input
            class="row bg-grey-3 q-pa-sm"
            style="height: 100px; border-radius: 10px;"
            v-model="newGroup.message+ course_name+newGroup.message1"
            label="Your Message here!"
          />
        </div>
      </q-card>

        <q-stepper-navigation>
          <q-btn @click="() => { done1 = true; step = 2 }" color="primary" label="continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
              </q-form>

      </q-step>
     <q-step
        :name="2"
        title="Add Days"
        icon="create_new_folder"
        :done="done2"
        
      >
      <q-card class="q-pa-sm q-ma-md bg-grey-2 q-pb-none">
      <div class="q-pa-md text-h5">Course Details</div>
      <q-btn  @click="Deleteday(selectDay)" :disabled="loading" class="col-3 col-sm-6" style="margin-left:95%" push color="red" round icon="delete" />
      <div class="row q-gutter-md q-pa-sm">
      <div class="col-2 bg-white q-pa-sm q-gutter-y-md">

       <q-btn
         v-for="(day,index) in days"
         :key="day.index"
         color="white" 
         text-color="black"
         
         v-on:click="add_first(day)"
         >Day {{day.num}}</q-btn>

      </div>
      <div class="col bg-white q-pa-sm q-gutter-md" style="">
          <form
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
    
      <q-editor
        ref="editor_ref"
        @paste.native="evt => pasteCapture(evt)"
        v-model="editor"
        placeholder="Type your contents...."
      />
    </form>
   <div class="bg-grey-3 q-pa-md q-gutter-sm">
   Question
   <q-input outlined v-model="question"  label="Question"/>
   <q-input outlined v-model="answer" label="Answer"/>
   </div>
      <q-btn 
       v-for="(day,index) in day_question"
       :key="day.no"
       color="white" 
       text-color="black" 
       v-on:click="add_ques(day)"
      >Question {{day.no}}</q-btn>

      <q-btn v-if="ques_pop==false" @click="addQuestions(index)" color="primary" label="Add Question" />
      <q-btn v-else-if="ques_pop==true" @click="saveQuestions(index)" color="primary" label="Save Question" />

         <q-btn v-if="alert==false" style="float:right" color="primary" label="Add Day" @click="addDay(index)"
      />
     <q-btn v-else-if="alert==true" style="float:right" color="primary" label="Save" @click="saveDay()"
      />
  </div>
      </div>
      </q-card>

        <q-stepper-navigation>
          <q-btn @click="submitCourse" color="primary" v-close-popup label="submit" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>

              </q-form>
              </q-step>
    </q-stepper>
    </q-card>
  </q-dialog>
  
  </div>

  <!-- Course details -->
 
</template>

<script>
import UserService from "../services/user.service";

export default {
  data() {
    return {
      step: 1,
      day_num: 0,
      day_question_num: 0,
      done1: false,
      done2: false,
      done3: false,
      loading: true,
      ques_pop: false,
      con: [],
      days: [],
      content: "",
      null: "",
      item: [],
      spin:true,
      CreateCourse: false,
      maximizedToggle: true,
      update: false,
      AddDay: false,
      course_name: "",
      selectedItem: null,
      selectDay: "",
      select_day_up:"",
      selectQues: null,
      item: null,
      question: "",
      answer: "",
      editor: "",
      author: "",
      description: "",
      left: true,
      alert: false,
      question_pop: false,
      catelist: "",
      course: false,
      newGroup: {
        name: "",
        description: "",
        categeory: "",
        message: "Welcome to ",
        message1:" !!!. Let's get started"
      },
      categeories: [
        {
          label: "Art & Design"
        },
        {
          label: "Business"
        },
        {
          label: "Computer Science"
        },
        {
          label: "Data Science"
        },
        {
          label: "Education & Teaching"
        },
        {
          label: "Engineering"
        },
        {
          label: "Health & Medicine"
        },
        {
          label: "Humanities"
        },
        {
          label: "Programming"
        }
      ],
      day_question: []
    };
  },

  mounted() {
    UserService.getCourse().then(
      response => {
        this.con = response.data.courses;
        //this.content = response.data.courses[0].name;
        this.item = response.data.course;
        this.spin=false
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          this.spin=false

      }
    );
    // UserService.getDay().then(
    //   response => {
    //     this.cours_id = response.data.days[0].course_id;
    //   },
    //   error => {
    //     this.day_content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
  },

  methods: {
    clear_days() {
      this.days = [];
      this.day_num = 0;
      this.day_question_num = 0;
      this.day_question = [];
      this.alert = false;
      this.selectDay="";
      this.loading = true;
      this.step=1
      this.editor=""
      this.question=""
      this.answer=""
      this.ques_pop=false
    },
    select: function(event) {
      //targetId = event;
      console.log(event);
      this.selectedItem = this.con.find(task => task.id == event);
      this.update = true;
      this.day_num = this.selectedItem.days.length;
    },
    add: function(event) {
      console.log(event);
      this.selectDay = event;
      this.alert = true;
      this.day_question_num = this.selectDay.questions.length;
      this.day_question = [];
      this.loading = false;
      this.editor=this.selectDay.text
      this.question=""
      this.answer=""
    },

    add_update: function(event) {
       console.log(event)
       this.select_day_up=event;
       this.editor=this.select_day_up.text
       this.day_question=this.select_day_up.questions
       this.day_question_num=this.select_day_up.questions.length
       this.alert=false
    },
    add_first: function(event){
       this.selectDay = event;
       this.day_question = [];
       this.alert = true;
       this.loading = false;
       this.editor=this.selectDay.text;
       this.day_question=this.selectDay.questions
       this.day_question_num=this.selectDay.questions.length
    },


    deleteDay(c_id, day) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `Do you want to delete day ${day}`,
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          console.log(c_id,day);
          await UserService.deleteDay(c_id, day);
          this.$router.go();
        });
    },
    Deleteday(item) {
      const index = this.days.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.days.splice(index,1);
        this.loading=true
        this.day_num=this.day_num-1
        for(var i=index;i<this.day_num;i++)
        {
          this.days[i].num=i+1
        }
        this.editor=""
        this.alert=false
        this.day_question=[]
    },
    next() {
      this.$refs.name.validate();
      this.$refs.course.validate();

      if (this.$refs.name.hasError || this.$refs.course.hasError) {
        this.formHasError = true;
      } else {
        this.step++;
        this.done1 = true;
      }
    },
    async submitCourse() {
      try {
        const details = {
          name: this.course_name,
          author: this.author,
          description: this.description,
          days: this.days
        };
        console.log('det:', details);
        const response = await UserService.submitCourse(details);
        this.message = response.message;
        console.log('msg:', this.message);
        // this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },
    addDay() {
      this.day_num = this.day_num + 1;
      this.days.push({
        text: this.editor,
        num: this.day_num,
        questions: this.day_question
      });
      this.day_question = [];
      this.editor = "";
      this.day_question_num = 0;
      this.question="";
      this.answer="";
      this.ques_pop=false;
    },
     saveDay() {       
        this.days[this.selectDay.num-1].text=this.editor
        this.alert=false;
        this.editor=""
        this.day_question=[];
        this.question="";
        this.answer="";
        this.day_question_num=0;
        this.ques_pop=false
     },

    add_ques: function(event) {
      this.selectQues = event;
      this.ques_pop = true;
      this.question=this.selectQues.question;
      this.answer=this.selectQues.correct_answer;
    },

     saveQuestions(){
        console.log(this.selectQues)
        this.day_question[this.selectQues.no-1].question=this.question
        this.day_question[this.selectQues.no-1].correct_answer=this.answer
        this.ques_pop=false;
        this.question="";
        this.answer="";

     },

    addQuestions() {
      this.day_question_num = this.day_question_num + 1;
      this.day_question.push({
        question: this.question,
        correct_answer: this.answer,
        no: this.day_question_num,
        type: "String"
      });
      this.question = "";
      this.answer = "";
    },

    async deletePost(id) {
      await UserService.deletePost(id);
      this.$router.go();
    },

    async updateCourse(id) {
      console.log(id);
      try {
        const details = {
          days: this.days
        };
        const response = await UserService.updateCourse(details, id);
        this.message = response.message;
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
        //this.$router.go();
      }
    },
    async updateDay(day, c_id) {
      console.log(day,c_id);
      try {
        const details = {
          text: this.selectDay.text,
          questions: this.day_question
        };
        const response = await UserService.updateDay(details, day, c_id);
        this.message = response.message;
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
        //this.$router.go();
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
