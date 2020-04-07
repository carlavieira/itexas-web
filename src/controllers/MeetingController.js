export default {
  getAllMeeting(axios) {
    let url = "http://itexas.pythonanywhere.com/meeting/";

    const response = axios
      .get(url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access_token")}`,
        },
      })
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
      .post(url, meetingDetails, {
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
};
