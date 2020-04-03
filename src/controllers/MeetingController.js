export default {
  getAllMeeting(axios) {
    let url = "http://itexas.pythonanywhere.com/meeting/";

    const response = axios
      .get(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`
        }
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  }
};
