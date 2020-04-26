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
  getParticipantsInMeeting(api, meetingId) {
    const response = api
      .get(`meeting_participation/?meeting=${meetingId}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
  editParticipationMeeting(api, participationDetails) {
    let url = `meeting_participation/${participationDetails.id}/`;
    const response = api
      .put(url, participationDetails)
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
