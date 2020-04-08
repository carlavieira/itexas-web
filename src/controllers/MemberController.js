let header = {
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
  },
}

export default {
  getAllMembers() {
    let url = "http://itexas.pythonanywhere.com/members/";
    console.log(localStorage.getItem("access_token"));

    const response = this.axios
      .get(url, header)
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return response;
  },
  
  createMember(axios, memberDetails) {
    let url = "http://itexas.pythonanywhere.com/rest-auth/registration/";

    const response = axios
      .post(url, memberDetails, header)
      .then(function (response) {
        // handle success
        return response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return response;
  },
};
