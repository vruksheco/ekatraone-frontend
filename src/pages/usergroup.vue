<template>
  <q-page>
    <!-- groups -->
    <div v-if="showGroup">
      <!-- add group -->
      <q-card-actions>
        <q-space />
        <q-btn @click="addGroupDialog=true" color="primary" no-caps label="Add Group" />
      </q-card-actions>
      <q-dialog v-model="addGroupDialog">
        <q-card>
          <q-card-section>Add Group</q-card-section>
          <q-card-section>
            <q-form>
              <q-input v-model="group_name" label="Name" outlined />
              <q-card-actions class="q-pt-md" align="right">
                <q-btn filled color="primary" label="Save" @click="alert =true" />
              </q-card-actions>
              <q-dialog
                v-model="alert"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="text-black">
                  <q-bar>
                    <q-space />
                    <q-btn @click="clear_days" dense flat icon="close" v-close-popup>
                      <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
                    </q-btn>
                  </q-bar>
                  <q-card-actions>
                    <q-space />
                    <q-btn
                      @click="addUserDialog=!addUserDialog"
                      color="secondary"
                      no-caps
                      label="Add User"
                    />
                    <q-btn no-caps label="Upload CSV" color="primary" @click="alert1 = true" />
                    <q-dialog v-model="alert1">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">Upload file</div>
                        </q-card-section>
                        <div style="margin-left:20px" class="col-sm-9 lg-3">
                          <input
                            type="file"
                            id="csv_file"
                            name="csv_file"
                            class="form-control"
                            @change="loadCSV($event)"
                          />
                        </div>

                        <q-card-actions align="right">
                          <q-btn @click="test" flat label="OK" color="primary" v-close-popup />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-card-actions>
                  <q-dialog v-model="addUserDialog">
                    <q-card>
                      <q-card-section>Add User</q-card-section>
                      <q-card-section>
                        <q-form>
                          <q-card-section class="q-gutter-md text-center">
                            <q-input v-model="editedItem.name" label="Name" outlined />
                            <div style="justify-content:space-between;display:flex; ">
                            <q-select
                              style="margin-right:10%; width:40%;position:center;"
                              v-model="editedItem.country_code"
                              :options="extention"
                              label="+x"
                            />
                            <q-input
                              v-model="editedItem.number"
                              label="Number"
                              outlined
                            />
                            </div>
                            <q-select
                              v-model="editedItem.channel"
                              :options="channels"
                              label="Channel"
                            />
                          </q-card-section>
                          <q-card-actions class="q-pt-md" align="right">
                            <q-btn
                              outline
                              color="primary"
                              label="Save"
                              type="submit"
                              v-close-popup
                              @click="addRow"
                            />
                          </q-card-actions>
                        </q-form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                  <q-card-section>
                    <div class="text-h6">Registered Users</div>
                  </q-card-section>

                  <div id="q-app">
                    <div class="q-pa-sm q-gutter-sm">
                      <q-table
                        title="Treats"
                        :data="data"
                        :columns="columns"
                        row-key="name"
                        binary-state-sort
                      >
                        <template v-slot:top>
                          <div class="q-pa-sm q-gutter-sm">
                            <q-dialog v-model="show_dialog">
                              <q-card>
                                <q-card-section>
                                  <div class="text-h6">Update</div>
                                </q-card-section>

                                <q-card-section>
                                  <div class="row">
                                    <q-input v-model="editedItem.name" label="Name"></q-input>
                                    <q-input v-model="editedItem.number" label="Phone Number"></q-input>
                                    <q-select
                                      v-model="editedItem.channel"
                                      :options="channels"
                                      label="Channel"
                                      style="width:40%"
                                    />
                                  </div>
                                </q-card-section>

                                <q-card-actions align="right">
                                  <q-btn
                                    flat
                                    label="OK"
                                    color="primary"
                                    v-close-popup
                                    @click="addRow"
                                  ></q-btn>
                                </q-card-actions>
                              </q-card>
                            </q-dialog>
                          </div>
                        </template>

                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="desc" :props="props">
                              {{ props.row.name }}
                              <q-popup-edit v-model="props.row.name">
                                <q-input v-model="props.row.name" dense autofocus counter></q-input>
                              </q-popup-edit>
                            </q-td>
                            <q-td key="number" :props="props">
                              {{ props.row.number }}
                              <q-popup-edit
                                v-model="props.row.number"
                                title="Update Phone Number"
                                buttons
                              >
                                <q-input type="number" v-model="props.row.number" dense autofocus></q-input>
                              </q-popup-edit>
                            </q-td>
                            <q-td key="channel" :props="props">
                              <div
                                class="text-pre-wrap"
                              >{{ props.row.channel.label || props.row.channel}}</div>
                              <q-popup-edit v-model="props.row.channel">
                                <q-input
                                  type="textarea"
                                  v-model="props.row.channel"
                                  dense
                                  autofocus
                                ></q-input>
                              </q-popup-edit>
                            </q-td>
                            <q-td key="subscribe" :props="props">
                              <q-toggle
                                v-model="props.row.is_subscribed"
                                checked-icon="add"
                                unchecked-icon="remove"
                              />
                            </q-td>
                            <q-td key="actions" :props="props">
                              <q-btn
                                color="blue"
                                label="Update"
                                @click="editItem(props.row)"
                                size="sm"
                                no-caps
                              ></q-btn>
                              <q-btn
                                color="red"
                                label="Delete"
                                @click="deleteItem(props.row)"
                                size="sm"
                                no-caps
                              ></q-btn>
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                    <q-btn
                      style="margin-left:5%; margin-top:1%"
                      @click="createUser"
                      color="primary"
                      v-close-popup
                      label="submit"
                    />
                  </div>
                </q-card>
              </q-dialog>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- groups end -->
      <div v-if="spin" class="q-pt-md absolute-center">
        <q-spinner-cube color="primary" size="5em" />
      </div>

      <div v-else class="row q-gutter-md q-px-md">
        <q-card class="my-card" v-for="(user,index) in group" :key="user.id">
          <q-img src="../test.jpg">
            <div class="absolute-bottom">
              <div class="text-h6">{{user.name}}</div>
            </div>
          </q-img>

          <q-card-actions>
            <q-btn v-on:click="updateGroup(user.id)" flat>Update</q-btn>
            <q-dialog
              v-if="update==true"
              v-model="update"
              persistent
              :maximized="maximizedToggle"
              transition-show="slide-up"
              transition-hide="slide-down"
            >
              <q-card class="text-black">
                <q-bar>
                  <q-space />
                  <q-btn @click="clear_days" dense flat icon="close" v-close-popup>
                    <q-tooltip content-class="bg-primary text-white">Close</q-tooltip>
                  </q-btn>
                </q-bar>
                <q-card-actions>
                  <q-space />
                  <q-btn @click="addUserDialog=!addUserDialog" color="secondary" label="Add User" />
                </q-card-actions>
                <q-dialog v-model="addUserDialog">
                  <q-card>
                    <q-card-section>Add User</q-card-section>
                    <q-card-section>
                      <q-form>
                        <q-card-section class="q-gutter-md text-center">
                          <q-input v-model="editedItem.name" label="Name" outlined />
                            <div style="justify-content:space-between;display:flex; ">
                            <q-select
                              style="margin-right:10%; width:40%;position:center;"
                              v-model="editedItem.country_code"
                              :options="extention"
                              label="+x"
                            />
                            <q-input
                              v-model="editedItem.number"
                              label="Number"
                              outlined
                            />
                            </div>
                            <q-select
                              v-model="editedItem.channel"
                              :options="channels"
                              label="Channel"
                            />
                        </q-card-section>
                        <q-card-actions class="q-pt-md" align="right">
                          <q-btn
                            outline
                            color="primary"
                            label="Save"
                            type="submit"
                            v-close-popup
                            @click="addUser"
                          />
                        </q-card-actions>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <q-card-section>
                  <div class="text-h6">Registered Users</div>
                </q-card-section>

                <div class="q-pa-sm q-gutter-sm">
                  <q-table
                    title="Students"
                    :data="list"
                    :columns="columns"
                    row-key="name"
                    binary-state-sort
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="desc" :props="props">
                          {{ props.row.name }}
                          <q-popup-edit v-model="props.row.name">
                            <q-input v-model="props.row.name" dense autofocus counter></q-input>
                          </q-popup-edit>
                        </q-td>
                        <q-td key="number" :props="props">
                          {{ props.row.number }}
                          <q-popup-edit
                            v-model="props.row.number"
                            title="Update Phone Number"
                            buttons
                          >
                            <q-input type="number" v-model="props.row.number" dense autofocus></q-input>
                          </q-popup-edit>
                        </q-td>
                        <q-td key="channel" :props="props">
                          <div
                            class="text-pre-wrap"
                          >{{ props.row.channel.label || props.row.channel}}</div>
                          <q-popup-edit v-model="props.row.channel">
                            <q-input type="textarea" v-model="props.row.channel" dense autofocus></q-input>
                          </q-popup-edit>
                        </q-td>
                        <q-td key="subscribe" :props="props">
                          <q-toggle
                            v-model="props.row.is_subscribed"
                            checked-icon="add"
                            unchecked-icon="remove"
                          />
                        </q-td>
                        <q-td key="actions" :props="props">
                          <q-btn
                            color="red"
                            @click="deleteUser(selectedGroup.id,props.row.id)"
                            size="sm"
                            no-caps
                          >Delete</q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
                <q-btn
                  style="margin-left:5%; margin-top:1%"
                  @click="updateUser(selectedGroup.name,selectedGroup.id)"
                  color="primary"
                  v-close-popup
                  label="submit"
                />
              </q-card>
            </q-dialog>
            <q-btn @click="deleteGroup(user.id)" flat>Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- Users -->
    </div>
  </q-page>
</template>

<script>
import UserService from "../services/user.service";

export default {
data() {
  return {
      addUserCount: 0,
      channel_name: "",
      channel_fields: [],
      channel_entries: [],
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: "",
      spin: true,
      selectedGroup: null,
      addUserDropdown: "",
      addGroupDialog: false,
      addUserDialog: false,
      maximizedToggle: true,
      showGroup: true,
      value: false,
      alert: false,
      update: false,
      alert1: false,
      is_subscribed: true,
      currentGroup: 0,
      group: [],
      list: [],
      updateList: [],
      group_name: "",
      courses: [
        {
          title: "Hello",
          done: false
        }
      ],
      channels: ["Whatsapp", "Sms"],
      extention:["+1","+7","+20","+91","+30","+31","+32","+33"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          sortable: true
        },
        {
          name: "number",
          align: "left",
          label: "Number",
          field: "number"
        },
        {
          name: "channel",
          align: "left",
          label: "Channel",
          field: "channel",
          sortable: true
        },
        {
          name: "subscribed",
          align: "left",
          label: "subscribed",
          field: "subscribed",
          sortable: true
        },
        { name: "edit", field: "edit" }
      ],

      show_dialog: false,
      editedIndex: -1,
      editedIndex1: 0,
      editedItem: {
        name: "",
        number: "",
        country_code:"",
        channel: "",
        is_subscribed: true
      },
      defaultItem: {
        name: "",
        number: "",
        country_code:"",
        channel: "",
        is_subscribed: true
      },
      columns: [
        {
          name: "desc",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "number",
          align: "center",
          label: "Number",
          field: "number",
          sortable: true
        },
        {
          name: "channel",
          label: "Channel",
          field: "channel",
          sortable: true,
          style: "width: 10px"
        },
        {
          name: "subscribe",
          label: "Subscribed",
          field: "is_subscribed",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },

        {
          name: "actions",
          label: "Actions",
          field: "actions"
        }
      ],
      data: []
    };
  },

  mounted() {
    UserService.getGroup().then(
      response => {
        this.group = response.data.groups;
        this.spin = false;

      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          this.spin = false;

      }
    );
  },

  methods: {
    test() {
      var i;
      for (i = 0; i < this.parse_csv.length; i++) {
        this.data.push(this.parse_csv[i]);
      }
    },
    clear_days() {
      this.addGroupDialog = false;
      this.alert = false;
      this.data = [];
      this.group_name = "";
    },
    async createUser() {
      this.addGroupDialog = false;

      try {
        const details = {
          name: this.group_name,
          description: "string",
          students: this.data
        };
        const response = await UserService.createUser(details);
        this.message = response.message;
        
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },

    // async updateGroup(id) {
    //   const response = await UserService.updateGroup(id).then(response => {
    //     this.list = response.data.group;
    //   });
    //   this.update = true;
    //   console.log(this.list);
    // },

    updateGroup: function(event) {
      this.selectedGroup = this.group.find(user => user.id == event);
      //console.log(this.selectedGroup)
      this.list = this.selectedGroup.students;
      this.update = true;
    },

    async deleteGroup(id) {
      try {
        await UserService.deleteGroup(id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },

    async updateUser(name, id) {
      try {
        this.$q.loading.show()
        const details = {
          name: name,
          description: "string",
          students: this.updateList
        };
        await UserService.updateUser(details, id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        while(this.addUserCount>0){
          // console.log('count:', this.addUserCount)
          this.list.pop()
          this.addUserCount-=1;
        }
        this.$q.notify(this.message);
      }finally{
        this.$q.loading.hide()
      }
    },

    async deleteUser(g_id, s_id) {
      try {
        await UserService.deleteUser(g_id, s_id);
        this.$router.go();
      } catch (error) {
        this.message = error.response.data.message;
        this.$q.notify(this.message);
      }
    },

    createGroup() {
      this.courses.push({
        title: this.name
      });
      this.name = "";
    },

    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
        this.addUserCount+=1
      } else {
        this.data.push(this.editedItem);
        this.addUserCount+=1
      }
      this.close();
    },

    addUser() {
      if (this.editedIndex > -1) {
        Object.assign(this.list[this.editedIndex], this.editedItem);
      } else {
        this.updateList.push(this.editedItem);
        this.list.push(this.editedItem);
        this.addUserCount+=1
      }
      this.close();
    },
    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    togle(item) {
      const index = this.value.indexOf(item);
      this.value = true;
    },
    close() {
      this.show_dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    sortBy: function(key) {
      var vm = this;
      vm.sortKey = key;
      vm.sortOrders[key] = vm.sortOrders[key] * -1;
    },
    csvJSON(csv) {
      var vm = this;
      var lines = csv.split("\n");
      var result = [];
      var headers = lines[0].split(",");
      vm.parse_header = lines[0].split(",");
      lines[0].split(",").forEach(function(key) {
        vm.sortOrders[key] = 1;
      });

      lines.map(function(line, indexLine) {
        if (indexLine < 1) return; // Jump header line

        var obj = { is_subscribed: true };
        var currentline = line.split(",");

        headers.map(function(header, indexHeader) {
          obj[header] = currentline[indexHeader];
        });

        result.push(obj);
      });

      result.pop(); // remove the last item because undefined values

      return result; // JavaScript object
    },
    loadCSV(e) {
      var vm = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        // Handle errors load
        reader.onload = function(event) {
          var csv = event.target.result;
          vm.parse_csv = vm.csvJSON(csv);
        };

        reader.onerror = function(evt) {
          if (evt.target.error.name == "NotReadableError") {
            alert("Canno't read file !");
          }
        };
      } else {
        alert("FileReader are not supported in this browser.");
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