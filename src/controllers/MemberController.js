export default {
  getAllMembers(axios) {
    let url = "http://itexas.pythonanywhere.com/members/";
    console.log(localStorage.getItem("access_token"));

    const response = axios
      .get(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      })
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
  /*createMember(memberDetails){
    
  }*/
};
