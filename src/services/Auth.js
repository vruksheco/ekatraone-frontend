import axios from "axios";
const url = "https://ekatra-backend-mvp-1.herokuapp.com/";
// const url = "http://127.0.0.1:5000/api/";

class Auth {
    async login(user) {
      const response = await axios
        .post(url + 'auth/login', {
          email: user.email,
          password: user.password
        });
      console.log(response.data.token);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    async signup(credentials) {
      const response = await axios
        .post(url + 'auth/signup', credentials);
      return response.data;

    }
    
    forgotPassword(credentials){
      return axios
      .post(url + 'auth/forgot', credentials)
      .then(response => response.data)

  }
}
  
  export default new Auth();
