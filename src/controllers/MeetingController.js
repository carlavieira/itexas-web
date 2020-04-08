let url = "meeting/";


export default {
  getAllMeeting(axios) {
    console.log(axios)
    const response = axios
      .get(url)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response;
  },

  createMeeting(meetingDetails) {

    const response = this.axios
      .post(url, meetingDetails)
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
