export default {
  createParticipationMeeting(api, participationDetails) {
    const response = api
      .post("manage-meeting-participation/", participationDetails)
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
      .get(`list-meeting-participation/?meeting=${meetingId}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
  editParticipationMeeting(api, participationDetails) {
    let url = `manage-meeting-participation/${participationDetails.id}/`;
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
  deleteParticipationMeeting(api, participationID) {
    let url = `manage-meeting-participation/${participationID}/`;
    const response = api
      .delete(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },
  getMemberParticipationEvent(api, participationID) {
    let url = `list-event-participation/?member=${participationID}`;
    const response = api
      .get(url)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },
  getMemberParticipationMeeting(api, participationID) {
    let url = `list-meeting-participation/?member=${participationID}`;
    const response = api
      .get(url)
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
