let url = "meeting/";

export default {
  getAllMeeting(api) {
    const response = api
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

  createMeeting(api, meetingDetails) {
    const response = api
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
