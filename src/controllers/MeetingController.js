let url = "meetingsApi/";
import participationController from "./ParticipationController";

export default {
  getAllMeeting(api) {
    const response = api
      .get(url)
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  createMeeting(api, meetingDetails) {
    console.log(meetingDetails);

    const response = api
      .post(url, meetingDetails)
      .then(function(response) {
        meetingDetails.participantes.map((participante) => {
          const part = new Object();
          const { id } = participante;
          part.member = id;
          part.attendance = participante.attendance;
          part.meeting = response.data.id;
          console.log(part);
          participationController.createParticipationMeeting(api, part);
        });
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },

  editMeeting(api, meetingDetails) {
    url = `meetingsApi/${meetingDetails.id}/`;
    delete meetingDetails.id;
    delete meetingDetails.leader;
    delete meetingDetails.url;
    console.log(meetingDetails);
    const response = api
      .put(url, meetingDetails)
      .then(function(response) {
        console.log(response);
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },
};
