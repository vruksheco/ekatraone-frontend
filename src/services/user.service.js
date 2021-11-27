import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://ekatra-backend-mvp-1.herokuapp.com/';
// const API_URL = 'http://127.0.0.1:5000/api/';

class UserService {
    getCourse(){
        return axios.get(API_URL + 'course/',
         { headers: authHeader() });
    }
    submitCourse(details){
        return axios.post(API_URL+'course/',details,
        { headers: authHeader()})
        .then(response => response.data);
    }

     deletePost(id)
     {
         return axios.delete(API_URL+`course/${id}`,
         { headers: authHeader() });
     }
     updateCourse(details,id)
     {
         return axios.put(API_URL+`course/${id}`,details,
         { headers: authHeader() })
         .then(response => response.data);

     }

    //  getDay(){
    //     return axios.get(API_URL + 'course/days',
    //     { headers: authHeader() });
    //  }

     updateDay(details,day,c_id){
        return axios.put(API_URL+`course/${c_id}/${day}`,details,
        { headers: authHeader() })
         .then(response => response.data);
     }
     
     deleteDay(c_id,day)
     {
         return axios.delete(API_URL+`course/${c_id}/${day}`,
         { headers: authHeader() });
     }
     
     createUser(details){
        return axios.post(API_URL+'group/',details,
        { headers: authHeader()})
        .then(response => response.data);
    }
    
    getGroup(){
        return axios.get(API_URL + 'group/',
         { headers: authHeader() });
    }

    deleteGroup(id)
    {
        return axios.delete(API_URL+`group/${id}`,
        { headers: authHeader() });
    }

    updateGroup(id){
        return axios.get(API_URL + `group/${id}`,
         { headers: authHeader() });
    }

    deleteUser(g_id,s_id)
        {
        return axios.delete(API_URL+`group/${g_id}/${s_id}/`,
        { headers: authHeader() });
    }
    
    updateUser(details,id){
        return axios.put(API_URL + `group/${id}`,details,
         { headers: authHeader() });
    }

    scheduleCourse(g_id,c_id,details){
        return axios.post(API_URL+`delivery/group/${g_id}/${c_id}/`,details,
        { headers: authHeader() })
        .then(response => response.data);
    }

    getDelivery(){
        return axios.get(API_URL + 'delivery/retrieve-delivery',
         { headers: authHeader() });
    }

    pause(id){
        return axios.put(API_URL+`delivery/${id}/pause_delivery`,null,
        { headers: authHeader() })
         .then(response => response.data);
     }

     restart(id){
        return axios.put(API_URL+`delivery/${id}/schedule_delivery`,null,
        { headers: authHeader() })
         .then(response => response.data);
     }

    stop(id){
        return axios.put(API_URL+`delivery/${id}/stop_delivery`,null,
        { headers: authHeader() })
         .then(response => response.data);
     }

     dashboard(){
        return axios.get(API_URL + 'dashboard/dashboard',
         { headers: authHeader() });
    }
    chart(){
        return axios.get(API_URL + 'dashboard/data',
         { headers: authHeader() });
    }

}

export default new UserService();