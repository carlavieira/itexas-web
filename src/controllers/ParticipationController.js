let url = "meeting_participation/";

export default {
  createParticipationMeeting(api, participationDetails) {
    const response = api
      .post(url, participationDetails)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },
};
