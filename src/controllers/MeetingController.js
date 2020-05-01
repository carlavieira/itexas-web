let url = "list-meetings/";
import participationController from "./ParticipationController";

export default {
  getAllMeeting(api) {
    url= "list-meetings/"
    const response = api
      .get(url)
      .then(function(response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },

  createMeeting(api, meetingDetails) {
    let url = "manage-meetings/";
    console.log(meetingDetails);

    const response = api
      .post(url, meetingDetails)
      .then(function(response) {
        meetingDetails.participantes.participantesWithName.map(
          (participante) => {
            const part = new Object();
            const { id } = participante;
            part.member = id;
            part.attendance = participante.attendance;
            part.meeting = response.data.id;
            console.log(part);
            participationController.createParticipationMeeting(api, part);
          }
        );
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },

  editMeeting(api, meetingDetails) {
    url = `manage-meetings/${meetingDetails.id}/`;

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

  deleteMeeting(api, meetingId) {
    url = `manage-meetings/${meetingId}/`;
    const response = api
      .delete(url)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return response;
  },


};
