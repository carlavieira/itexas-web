

export default {

    getAllMembers(http){
        let url = "http://itexas.pythonanywhere.com/members/";

        console.log(http.headers)

        http.headers['Authorization'] = `JWT ${localStorage.getItem("access_token")}`


        return http
          .get(url)
          .then(res => {
            return res;
          })
          .catch(err => {
            return err
          });
    }

}