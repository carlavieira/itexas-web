export default {
  getAllMembers(axios) {
    let url = "http://itexas.pythonanywhere.com/members/";

    return axios
      .get(url)
      .then(function(response) {
        // handle success
        return response;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  },
};
