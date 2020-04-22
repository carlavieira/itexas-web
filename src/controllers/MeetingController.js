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
          part.attendance = participante.presente;
          part.meeting = response.data.id;
          console.log(part);
          participationController.createParticipationMeeting(api, part);
        });
        console.log(response.data);
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return response;
  },
};
