let header = {
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
  },
}

export default {
  getAllMeeting() {
    let url = "http://itexas.pythonanywhere.com/meeting/";

    const response = this.axios
      .get(url, header)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  },
  createMeeting(axios, meetingDetails) {
    let url = "http://itexas.pythonanywhere.com/meeting/";

    const response = axios
      .post(url, meetingDetails, header)
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
