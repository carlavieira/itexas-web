import router from "../router/index";


export default {
  login(http, email, senha) {
    let request = new Object();

    request.username = "";
    request.email = email;
    request.password = senha;

    let url = "http://itexas.pythonanywhere.com/rest-auth/login/";

    return http
      .post(url, request)
      .then(res => {
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        this.routerPath(res);
        return res;
      })
      .catch(function(err) {
        return err;
      });
  },

  routerPath(res) {
    res.data.user.is_staff
      ? router.push("/adm/membros")
      : router.push("/adm/eventos");
  },

  logout(http){
    let url = "http://itexas.pythonanywhere.com/rest-auth/logout/";

    return http
      .post(url)
      .then(res => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id")
        router.push("/login")
        return res;
      })
      .catch(err => {
        return err;
      });
  }
};
