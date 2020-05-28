import router from "../router/index";

export default {
  login(http, email, senha) {
    let request = new Object();

    request.username = "";
    request.email = email;
    request.password = senha;

    let url = "https://itexas.herokuapp.com/rest-auth/login/";

    return http
      .post(url, request)
      .then((res) => {
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("is_staff", res.data.user.is_staff);
        router.push("/membro/dashboard");
        console.log(localStorage.getItem("user_id"));
        console.log(localStorage.getItem("access_token"));
        console.log(localStorage.getItem("is_staff"));
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },

  logout(http) {
    let url = "https://itexas.herokuapp.com/rest-auth/logout/";

    return http
      .post(url)
      .then((res) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("is_staff");
        router.push("/login");
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  sendEmail(http, email) {
    let url = "https://itexas.herokuapp.com/rest-auth/password/reset/";
    return http
      .post(url, { email })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
  passwordChange(api, passwords) {
    let url = "https://itexas.herokuapp.com/rest-auth/password/change/";
    const response = api
      .post(url, passwords)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        throw error;
      });
    return response;
  },
};
